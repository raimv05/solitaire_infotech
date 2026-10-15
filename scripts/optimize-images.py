import os
import glob
from PIL import Image

def optimize():
    tasks = [
        {
            'src': 'public/img/logo-transparent.png',
            'webp_dst': 'public/img/logo-transparent.webp',
            'opt_dst': 'public/img/logo-transparent.png',
            'max_dim': 320,
            'is_transparent': True,
            'webp_q': 92
        },
        {
            'src': 'public/assets/solitaire-logo-transparent.png',
            'webp_dst': 'public/assets/solitaire-logo-transparent.webp',
            'opt_dst': 'public/assets/solitaire-logo-transparent.png',
            'max_dim': 192,
            'is_transparent': True,
            'webp_q': 90
        },
        {
            'src': 'public/assets/about-top.jpg',
            'webp_dst': 'public/assets/about-top.webp',
            'opt_dst': 'public/assets/about-top.jpg',
            'max_dim': 1200,
            'is_transparent': False,
            'webp_q': 82
        },
        {
            'src': 'public/assets/about-bottom.jpg',
            'webp_dst': 'public/assets/about-bottom.webp',
            'opt_dst': 'public/assets/about-bottom.jpg',
            'max_dim': 1200,
            'is_transparent': False,
            'webp_q': 82
        },
        {
            'src': 'public/assets/contact-map.jpg',
            'webp_dst': 'public/assets/contact-map.webp',
            'opt_dst': 'public/assets/contact-map.jpg',
            'max_dim': 1200,
            'is_transparent': False,
            'webp_q': 82
        },
        {
            'src': 'public/assets/workflow-plan.jpg',
            'webp_dst': 'public/assets/workflow-plan.webp',
            'opt_dst': 'public/assets/workflow-plan.jpg',
            'max_dim': 800,
            'is_transparent': False,
            'webp_q': 82
        },
        {
            'src': 'public/assets/workflow-design.jpg',
            'webp_dst': 'public/assets/workflow-design.webp',
            'opt_dst': 'public/assets/workflow-design.jpg',
            'max_dim': 800,
            'is_transparent': False,
            'webp_q': 82
        },
        {
            'src': 'public/assets/workflow-deliver.jpg',
            'webp_dst': 'public/assets/workflow-deliver.webp',
            'opt_dst': 'public/assets/workflow-deliver.jpg',
            'max_dim': 800,
            'is_transparent': False,
            'webp_q': 82
        },
        {
            'src': 'public/img/erp.jpg',
            'webp_dst': 'public/img/erp.webp',
            'opt_dst': 'public/img/erp.jpg',
            'max_dim': 800,
            'is_transparent': False,
            'webp_q': 82
        },
        {
            'src': 'public/img/img2.jpeg',
            'webp_dst': 'public/img/img2.webp',
            'opt_dst': 'public/img/img2.jpeg',
            'max_dim': 800,
            'is_transparent': False,
            'webp_q': 82
        },
        {
            'src': 'public/img/img3.jpeg',
            'webp_dst': 'public/img/img3.webp',
            'opt_dst': 'public/img/img3.jpeg',
            'max_dim': 800,
            'is_transparent': False,
            'webp_q': 82
        },
    ]

    total_orig = 0
    total_webp = 0
    total_opt = 0

    for t in tasks:
        src_path = t['src']
        orig_size = os.path.getsize(src_path)
        total_orig += orig_size

        with Image.open(src_path) as im:
            w, h = im.size
            if max(w, h) > t['max_dim']:
                scale = t['max_dim'] / max(w, h)
                new_w, new_h = int(w * scale), int(h * scale)
                im_resized = im.resize((new_w, new_h), Image.Resampling.LANCZOS)
            else:
                im_resized = im.copy()

            # Save WebP version
            im_resized.save(t['webp_dst'], format='WEBP', quality=t['webp_q'], method=6)
            webp_size = os.path.getsize(t['webp_dst'])
            total_webp += webp_size

            # Save optimized original format fallback
            if t['is_transparent']:
                im_resized.save(t['opt_dst'], format='PNG', optimize=True)
            else:
                if im_resized.mode in ('RGBA', 'P'):
                    im_resized = im_resized.convert('RGB')
                im_resized.save(t['opt_dst'], format='JPEG', quality=82, optimize=True)

            opt_size = os.path.getsize(t['opt_dst'])
            total_opt += opt_size

            savings = ((orig_size - webp_size) / orig_size) * 100
            print(f"{os.path.basename(src_path)}: {orig_size/1024:.1f} KB -> WebP: {webp_size/1024:.1f} KB, OptFallback: {opt_size/1024:.1f} KB (-{savings:.1f}%)")

    # Generate hero poster webp from public/assets/hero-poster.jpg if present
    if os.path.exists('public/assets/hero-poster.jpg'):
        with Image.open('public/assets/hero-poster.jpg') as im:
            im.save('public/assets/hero-poster.webp', format='WEBP', quality=82, method=6)
            poster_size = os.path.getsize('public/assets/hero-poster.webp')
            print(f"hero-poster.webp generated: {poster_size/1024:.1f} KB")

    print('-----------------------------------------')
    print(f"TOTAL ORIGINAL: {total_orig/1024/1024:.2f} MB")
    print(f"TOTAL WEBP:     {total_webp/1024/1024:.2f} MB")
    print(f"TOTAL SAVED:    {((total_orig - total_webp)/total_orig)*100:.1f}% bandwidth reduction!")

if __name__ == '__main__':
    optimize()
