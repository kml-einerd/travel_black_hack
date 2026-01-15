import os

replacement = """<div class="card-image-placeholder" aria-label="Card Image">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
</div>"""

target_dir = 'Projeto/demos'

for root, dirs, files in os.walk(target_dir):
    for file in files:
        if file.endswith('.html'):
            path = os.path.join(root, file)
            with open(path, 'r') as f:
                content = f.read()

            if '[Card Image]' in content or '[Placeholder]' in content:
                print(f"Updating {path}")
                content = content.replace('[Card Image]', replacement)
                content = content.replace('[Placeholder]', replacement)

                with open(path, 'w') as f:
                    f.write(content)
