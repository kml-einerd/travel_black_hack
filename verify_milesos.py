from playwright.sync_api import sync_playwright
import os
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Test index.html (Dashboard)
        index_url = "http://localhost:8080/Projeto/demos/index.html"
        print(f"Navigating to {index_url}")
        page.goto(index_url)
        page.set_viewport_size({"width": 1280, "height": 1400})
        page.wait_for_timeout(1000)
        page.screenshot(path="/home/jules/verification/index.png")
        print("Captured index.png")

        # Test deal-radar.html (Renamed)
        deals_url = "http://localhost:8080/Projeto/demos/news/deal-radar.html"
        print(f"Navigating to {deals_url}")
        page.goto(deals_url)
        page.wait_for_timeout(1000)
        page.screenshot(path="/home/jules/verification/deals.png")
        print("Captured deals.png")

        # Test foundations.html (Ebook)
        ebook_url = "http://localhost:8080/Projeto/demos/ebooks/foundations.html"
        print(f"Navigating to {ebook_url}")
        page.goto(ebook_url)
        page.wait_for_timeout(1000)
        page.screenshot(path="/home/jules/verification/ebook.png")
        print("Captured ebook.png")

        browser.close()

if __name__ == "__main__":
    os.makedirs("/home/jules/verification", exist_ok=True)
    run()
