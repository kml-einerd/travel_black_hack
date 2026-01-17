#!/usr/bin/env python3
"""
Miles Intelligence - Image Sync Tool v4.0
Script para sincronizar imagens com os arquivos JSON.

Uso:
    python3 sync_images.py [--check-only] [--generate-placeholders]

Opções:
    --check-only            Apenas verifica, não altera arquivos
    --generate-placeholders Gera placeholders SVG para imagens faltantes
"""

import os
import json
import sys
from pathlib import Path
from typing import Dict, List, Set, Tuple

# Configuração
BASE_DIR = Path(__file__).parent
DEMOS_DIR = BASE_DIR / "demos"
DATA_DIR = DEMOS_DIR / "data"
IMAGES_DIR = DEMOS_DIR / "images"
BANCO_IMAGENS_DIR = BASE_DIR / "banco_imagens"

# Mapeamento de pastas do banco de imagens para demos/images
BANCO_MAPPING = {
    "01_cartoes_e_pagamentos": "cards",
    "02_viagem_e_destinos": "destinations",
    "03_aviacao_e_lounges": "travel",
    "04_educacional_e_ebooks": "evergreen",
    "05_utilitarios_e_documentos": "core",
    "06_interface_e_icones": "core"
}

# Cores para output
class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    BOLD = '\033[1m'
    END = '\033[0m'

def print_header(text: str):
    print(f"\n{Colors.BOLD}{Colors.BLUE}{'='*60}{Colors.END}")
    print(f"{Colors.BOLD}{Colors.BLUE}{text}{Colors.END}")
    print(f"{Colors.BOLD}{Colors.BLUE}{'='*60}{Colors.END}")

def print_success(text: str):
    print(f"{Colors.GREEN}✓ {text}{Colors.END}")

def print_error(text: str):
    print(f"{Colors.RED}✗ {text}{Colors.END}")

def print_warning(text: str):
    print(f"{Colors.YELLOW}⚠ {text}{Colors.END}")

def print_info(text: str):
    print(f"{Colors.BLUE}ℹ {text}{Colors.END}")

def get_all_images_in_dir(directory: Path) -> Set[str]:
    """Retorna todos os arquivos de imagem em um diretório (recursivo)."""
    extensions = {'.jpg', '.jpeg', '.png', '.webp', '.avif', '.svg', '.gif'}
    images = set()
    
    if directory.exists():
        for file in directory.rglob("*"):
            if file.suffix.lower() in extensions:
                images.add(str(file.relative_to(directory)))
    
    return images

def extract_image_paths_from_json(json_file: Path) -> List[str]:
    """Extrai todos os caminhos de imagem de um arquivo JSON."""
    image_paths = []
    
    try:
        with open(json_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        def find_images(obj, paths=[]):
            if isinstance(obj, dict):
                for key, value in obj.items():
                    if key in ['image', 'image_url', 'logo', 'logo_url', 'thumbnail']:
                        if isinstance(value, str) and value:
                            paths.append(value)
                    else:
                        find_images(value, paths)
            elif isinstance(obj, list):
                for item in obj:
                    find_images(item, paths)
            return paths
        
        image_paths = find_images(data)
    except Exception as e:
        print_error(f"Erro ao processar {json_file}: {e}")
    
    return image_paths

def check_image_exists(image_path: str) -> Tuple[bool, str]:
    """Verifica se uma imagem existe e retorna o caminho absoluto."""
    # Remove ../ prefix se existir
    clean_path = image_path
    while clean_path.startswith('../'):
        clean_path = clean_path[3:]
    
    # Tenta encontrar no demos/images
    full_path = DEMOS_DIR / clean_path
    if full_path.exists():
        return True, str(full_path)
    
    # Tenta encontrar no banco_imagens
    for banco_folder, target_folder in BANCO_MAPPING.items():
        banco_path = BANCO_IMAGENS_DIR / banco_folder
        if banco_path.exists():
            # Procura por nome similar
            filename = Path(clean_path).name
            for file in banco_path.glob("*"):
                if file.is_file():
                    # Normaliza o nome para comparação
                    normalized_target = filename.lower().replace('-', '_').replace(' ', '_')
                    normalized_source = file.stem.lower().replace('-', '_').replace(' ', '_')
                    if normalized_target.split('.')[0] in normalized_source or normalized_source in normalized_target.split('.')[0]:
                        return True, str(file)
    
    return False, ""

def generate_placeholder_svg(width: int = 1200, height: int = 600) -> str:
    """Gera um placeholder SVG."""
    return f'''<svg width="{width}" height="{height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1E3A5F;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#102A43;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#grad)"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="#627D98" text-anchor="middle" dy=".3em">Miles Intelligence</text>
  <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="14" fill="#486581" text-anchor="middle" dy=".3em">Image Placeholder</text>
</svg>'''

def scan_json_files() -> Dict[str, List[str]]:
    """Escaneia todos os arquivos JSON e extrai caminhos de imagem."""
    json_files = {}
    
    for json_file in DATA_DIR.glob("*.json"):
        images = extract_image_paths_from_json(json_file)
        if images:
            json_files[json_file.name] = images
    
    return json_files

def scan_banco_imagens() -> Dict[str, List[str]]:
    """Escaneia o banco de imagens disponível."""
    banco = {}
    
    for folder in BANCO_IMAGENS_DIR.iterdir():
        if folder.is_dir():
            images = get_all_images_in_dir(folder)
            if images:
                banco[folder.name] = list(images)
    
    return banco

def main():
    check_only = '--check-only' in sys.argv
    generate_placeholders = '--generate-placeholders' in sys.argv
    
    print_header("MILES INTELLIGENCE - IMAGE SYNC TOOL v4.0")
    
    # 1. Escanear JSONs
    print_header("1. ESCANEANDO ARQUIVOS JSON")
    json_images = scan_json_files()
    
    total_refs = 0
    for json_file, images in json_images.items():
        print_info(f"{json_file}: {len(images)} referências de imagem")
        total_refs += len(images)
    
    print(f"\n{Colors.BOLD}Total de referências: {total_refs}{Colors.END}")
    
    # 2. Escanear banco de imagens
    print_header("2. BANCO DE IMAGENS DISPONÍVEL")
    banco = scan_banco_imagens()
    
    total_available = 0
    for folder, images in banco.items():
        print_info(f"{folder}: {len(images)} imagens")
        total_available += len(images)
    
    print(f"\n{Colors.BOLD}Total disponível: {total_available}{Colors.END}")
    
    # 3. Verificar existência de imagens
    print_header("3. VERIFICANDO IMAGENS REFERENCIADAS")
    
    missing = []
    found = []
    
    for json_file, images in json_images.items():
        print(f"\n{Colors.BOLD}→ {json_file}{Colors.END}")
        
        for image_path in images:
            exists, actual_path = check_image_exists(image_path)
            if exists:
                found.append((json_file, image_path, actual_path))
                print_success(f"  {image_path}")
            else:
                missing.append((json_file, image_path))
                print_error(f"  {image_path}")
    
    # 4. Resumo
    print_header("4. RESUMO")
    print(f"\n{Colors.GREEN}Encontradas: {len(found)}{Colors.END}")
    print(f"{Colors.RED}Faltando: {len(missing)}{Colors.END}")
    
    if missing:
        print_header("5. IMAGENS FALTANTES")
        for json_file, image_path in missing:
            print(f"  [{json_file}] {image_path}")
        
        # Sugestões
        print_header("6. SUGESTÕES")
        print("""
Para resolver as imagens faltantes:

1. BAIXE as imagens seguindo as especificações em:
   demos/IMAGE_REQUIREMENTS.md

2. COLOQUE as imagens nas pastas corretas em:
   demos/images/{category}/

3. EXECUTE este script novamente:
   python3 sync_images.py

4. OU use imagens do banco existente copiando de:
   banco_imagens/

Para cada imagem faltante, você pode:
- Copiar uma imagem similar do banco_imagens
- Baixar uma nova imagem que atenda às especificações
- O script atualizará automaticamente os JSONs
        """)
    
    if generate_placeholders and missing:
        print_header("7. GERANDO PLACEHOLDERS")
        
        placeholder_dir = IMAGES_DIR / "placeholders"
        placeholder_dir.mkdir(exist_ok=True)
        
        for json_file, image_path in missing:
            filename = Path(image_path).stem + ".svg"
            placeholder_path = placeholder_dir / filename
            
            if not placeholder_path.exists():
                with open(placeholder_path, 'w') as f:
                    f.write(generate_placeholder_svg())
                print_success(f"Criado: {placeholder_path}")
    
    # Código de saída
    return 1 if missing else 0

if __name__ == "__main__":
    sys.exit(main())
