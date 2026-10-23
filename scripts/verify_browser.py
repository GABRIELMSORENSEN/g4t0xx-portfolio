import functools,http.server,json,os,threading
from pathlib import Path
from playwright.sync_api import sync_playwright,expect
ROOT=Path(__file__).resolve().parents[1]
REPORTS=ROOT/'reports/original-published';REPORTS.mkdir(parents=True,exist_ok=True)
class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*_):pass
server=http.server.ThreadingHTTPServer(('127.0.0.1',0),functools.partial(Handler,directory=str(ROOT/'docs')))
threading.Thread(target=server.serve_forever,daemon=True).start()
result={}
try:
    with sync_playwright() as p:
        browser=p.chromium.launch()
        page=browser.new_page(viewport={'width':1440,'height':1000})
        errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
        page.goto(os.environ.get('PORTFOLIO_URL',f'http://127.0.0.1:{server.server_port}'),wait_until='networkidle')
        expect(page.locator('#intro')).to_have_class('hidden',timeout=10000)
        expect(page.locator('.project-card')).to_have_count(12)
        expect(page.locator('.hero-name')).to_contain_text('SORENSEN')
        assert 'Bebas Neue' in page.locator('.hero-name').evaluate('(e)=>getComputedStyle(e).fontFamily')
        page.screenshot(path=str(REPORTS/'hero.png'))
        page.locator('#computer').scroll_into_view_if_needed()
        expect(page.locator('.computer-visual')).to_have_class('computer-visual reveal visible')
        monitor=page.locator('.monitor-3d')
        assert monitor.evaluate('(e)=>getComputedStyle(e).animationName')=='monitorFloat'
        before=monitor.evaluate('(e)=>getComputedStyle(e).transform');page.wait_for_timeout(300)
        assert before!=monitor.evaluate('(e)=>getComputedStyle(e).transform')
        page.wait_for_function("Array.from(document.querySelectorAll('.screen-line')).some(e=>Number(getComputedStyle(e).opacity)>.5)",timeout=15000)
        page.screenshot(path=str(REPORTS/'computer.png'))
        page.locator('.project-card').first.scroll_into_view_if_needed()
        expect(page.locator('.project-card').first).to_have_class('project-card featured visible')
        titles=page.locator('.project-title').all_text_contents()
        for title in ['PULSE SUSTENTABILIDADE','G4T0XX YT MUSIC PLAYER','JARVIS-POLIGON OS','AUTONOMOUS AI BUSINESS ENGINE','VRCHAT TRANSLATOR HUB','G4T0XX MODMENU']:assert title in titles,title
        links=page.locator('.project-link').evaluate_all('(els)=>els.map(e=>e.href)')
        assert not any('/G4T0XX-VISION' in link or '/VRChat-Translator-Hub' in link or '/G4T0XX-Hybrid-FBT' in link or '/v2.0.0-preview.1' in link for link in links)
        page.screenshot(path=str(REPORTS/'projects.png'))
        for width in (390,768,1440):
            page.set_viewport_size({'width':width,'height':844})
            assert page.evaluate('document.documentElement.scrollWidth<=window.innerWidth'),width
        page.set_viewport_size({'width':390,'height':844});page.locator('#computer').scroll_into_view_if_needed();page.screenshot(path=str(REPORTS/'mobile.png'))
        assert not errors,errors
        result={'projects':12,'original_four_preserved':True,'computer_3d_visible':True,'computer_animation_running':True,'original_typography':True,'private_links_excluded':True,'responsive':[390,768,1440],'runtime_errors':errors}
        browser.close()
finally:server.shutdown();server.server_close()
(REPORTS/'browser.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
print(json.dumps(result))
