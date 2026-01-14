# Data Schemas Documentation

> Complete reference for all data structures used in MilesAI

---

## Credit Card Schema

Credit cards are the foundation of earning strategies.

### Structure

```json
{
  "id": "string (kebab-case)",
  "name": "string",
  "issuer": "string (enum)",
  "network": "string (enum: visa, mastercard, amex, discover)",
  "program": "string (references loyalty program)",
  "annual_fee": "number (USD)",
  "welcome_bonus": {
    "points": "number",
    "spend_requirement": "number (USD)",
    "time_limit_months": "number",
    "value_estimate": "number (USD)"
  },
  "earning_rates": [
    {
      "category": "string",
      "rate": "number (points per dollar)",
      "note": "string (optional)"
    }
  ],
  "benefits": ["string"],
  "credit_score_required": "string (enum: excellent, good, fair)",
  "best_for": ["string"],
  "restrictions": ["string"],
  "affiliate_link": "string (URL, optional)",
  "updated_at": "string (ISO 8601)"
}
```

### Field Definitions

- **id**: Unique identifier in kebab-case format
- **issuer**: One of: chase, amex, citi, bofa, capital-one, discover, barclays, usbank
- **program**: Reference to loyalty program ID
- **earning_rates**: Array of category multipliers
  - Common categories: travel, dining, groceries, gas, streaming, drugstores, other
- **credit_score_required**: excellent (750+), good (700-749), fair (650-699)
- **updated_at**: ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)

---

## Loyalty Program Schema

Points and miles programs where value is created.

### Structure

```json
{
  "id": "string (kebab-case)",
  "name": "string",
  "type": "string (enum: bank, airline, hotel)",
  "cpp_values": {
    "cashback": "number (cents)",
    "travel_portal": "number (cents)",
    "travel_portal_premium": "number (cents, optional)",
    "transfer_average": "number (cents)",
    "transfer_best": "number (cents)"
  },
  "transfer_partners": [
    {
      "program": "string",
      "airline": "string (optional)",
      "alliance": "string (optional)",
      "type": "string (optional: hotel)",
      "ratio": "string (e.g., '1:1')",
      "transfer_time": "string (instant, 1-2 days, etc.)",
      "sweet_spots": ["string"]
    }
  ],
  "expiration_policy": "string",
  "pooling": "string (Yes/No + details)",
  "notes": ["string"],
  "updated_at": "string (ISO 8601)"
}
```

### Field Definitions

- **cpp_values**: Cents per point values
  - cashback: Simple cash redemption value
  - travel_portal: Booking through program's portal
  - travel_portal_premium: With premium card (if applicable)
  - transfer_average: Typical transfer partner value
  - transfer_best: Best observed transfer value
- **alliance**: One of: Star Alliance, OneWorld, SkyTeam
- **transfer_time**: instant, 1-2 days, 2-3 days, 1-2 weeks

---

## Deal Schema

Time-sensitive opportunities and promotions.

### Structure

```json
{
  "id": "string (deal-YYYY-MM-NNN)",
  "type": "string (enum)",
  "card_id": "string (optional, references card)",
  "title": "string",
  "description": "string",
  "value_estimate": "number (USD)",
  "original_value": "number (USD, optional)",
  "savings_percent": "number (optional)",
  "requirements": "string",
  "additional_details": "object (optional)",
  "expires_at": "string (ISO 8601)",
  "source_url": "string (URL)",
  "tags": ["string"],
  "is_targeted": "boolean",
  "priority": "string (enum: low, medium, high)",
  "cpp_calculation": {
    "conservative": "number",
    "typical": "number",
    "optimized": "number"
  },
  "created_at": "string (ISO 8601)",
  "updated_at": "string (ISO 8601)"
}
```

### Field Definitions

- **type**: One of: card_bonus, transfer_bonus, hotel_promo, airline_deal, portal_bonus, bank_bonus
- **priority**: How urgent/valuable the deal is
- **is_targeted**: Whether deal requires specific targeting
- **cpp_calculation**: Value ranges for point-based deals

---

## Award Flight Schema

Award availability and booking information.

### Structure

```json
{
  "id": "string",
  "origin": {
    "code": "string (IATA)",
    "city": "string",
    "airport": "string (full name)",
    "country": "string (ISO 2-letter)"
  },
  "destination": {
    "code": "string (IATA)",
    "city": "string",
    "airport": "string (full name)",
    "country": "string (ISO 2-letter)"
  },
  "airline": "string",
  "flight_number": "string",
  "aircraft": "string (optional)",
  "cabin_class": "string (enum)",
  "cabin_name": "string (brand name)",
  "program": "string (references loyalty program)",
  "points_required": "number",
  "taxes_usd": "number",
  "cash_price_usd": "number",
  "cpp_value": "number (calculated)",
  "cpp_rating": "string (enum)",
  "value_analysis": {
    "cash_equivalent": "number",
    "points_cost_dollars": "number",
    "net_savings": "number",
    "savings_percent": "number"
  },
  "availability": {
    "dates_available": ["string (YYYY-MM-DD)"],
    "seats_typical": "number",
    "last_checked": "string (ISO 8601)"
  },
  "route_type": "string (enum)",
  "duration_hours": "number",
  "departure_time": "string (HH:MM)",
  "arrival_time": "string (HH:MM, may include +1 for next day)",
  "amenities": ["string"],
  "booking_notes": ["string"],
  "alternative_programs": [
    {
      "program": "string",
      "points_required": "number",
      "note": "string"
    }
  ],
  "updated_at": "string (ISO 8601)"
}
```

### Field Definitions

- **cabin_class**: economy, premium_economy, business, first
- **cpp_rating**: poor (<1.0), fair (1.0-1.4), good (1.5-1.9), excellent (2.0-2.4), outstanding (2.5+)
- **route_type**: direct, one_stop, multi_stop
- **cpp_value**: Automatically calculated as (cash_price_usd - taxes_usd) / points_required * 100

---

## User Profile Schema (for app)

User data for personalized recommendations.

### Structure

```json
{
  "user_id": "string (UUID)",
  "email": "string",
  "created_at": "string (ISO 8601)",
  "profile": {
    "name": "string",
    "home_airport": "string (IATA)",
    "travel_style": "string (enum)",
    "annual_travel_budget": "number (USD)",
    "credit_score": "number (optional)",
    "monthly_spend": {
      "dining": "number",
      "groceries": "number",
      "gas": "number",
      "travel": "number",
      "other": "number"
    }
  },
  "cards": [
    {
      "card_id": "string (references card)",
      "opened_date": "string (YYYY-MM-DD)",
      "credit_limit": "number (optional)",
      "welcome_bonus_earned": "boolean",
      "status": "string (enum: active, closed)"
    }
  ],
  "points_balances": [
    {
      "program": "string (references loyalty program)",
      "balance": "number",
      "expiration_date": "string (YYYY-MM-DD, optional)",
      "last_synced": "string (ISO 8601)"
    }
  ],
  "preferences": {
    "preferred_programs": ["string"],
    "travel_goals": ["string"],
    "risk_tolerance": "string (enum: conservative, moderate, aggressive)"
  }
}
```

### Field Definitions

- **travel_style**: budget, balanced, premium, luxury
- **risk_tolerance**: How aggressive with applications and strategies
- **status**: active (open and in use), closed (voluntarily closed), cancelled (by issuer)

---

## API Response Envelopes

All API responses follow this structure:

### Success Response

```json
{
  "success": true,
  "data": {},
  "meta": {
    "timestamp": "string (ISO 8601)",
    "version": "string (API version)"
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "string",
    "message": "string",
    "details": "object (optional)"
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "version": "string (API version)"
  }
}
```

---

## Data Validation Rules

### Required Fields
All schemas must include:
- `id` (unique identifier)
- `updated_at` (ISO 8601 timestamp)

### Data Freshness
- Credit card data: Update monthly
- Loyalty program data: Update quarterly
- Deal data: Update daily
- Award flight data: Update hourly (automated)

### Value Calculations
- All monetary values in USD
- All percentages as decimals (50% = 50, not 0.5)
- CPP (cents per point) always includes 2 decimal places
- Dates in ISO 8601 format (YYYY-MM-DD or full timestamp)

### Enums and Constants

**Issuers**: chase, amex, citi, bofa, capital-one, discover, barclays, usbank, wells-fargo

**Networks**: visa, mastercard, amex, discover

**Credit Score Ranges**:
- excellent: 750+
- good: 700-749
- fair: 650-699

**Cabin Classes**: economy, premium_economy, business, first

**CPP Ratings**:
- poor: < 1.0¢
- fair: 1.0-1.4¢
- good: 1.5-1.9¢
- excellent: 2.0-2.4¢
- outstanding: 2.5¢+

---

## Schema Evolution

### Versioning
- Major version: Breaking changes
- Minor version: Additive changes
- Patch version: Bug fixes

### Backward Compatibility
- New optional fields can be added anytime
- Required fields cannot be removed
- Field types cannot change
- Deprecated fields marked with `deprecated: true`

### Change Log
All schema changes documented with:
- Date of change
- Fields affected
- Migration path
- Deprecation timeline (if applicable)

---

*Last Updated: January 14, 2026*
