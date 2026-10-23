import functools,http.server,json,threading
from pathlib import Path
from playwright.sync_api import sync_playwright,expect
ROOT=Path(__file__).resolve().parents[1]
REPORTS=ROOT/'reports';REPORTS.mkdir(exist_ok=True)
class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*_):pass
server=http.server.ThreadingHTTPServer(('127.0.0.1',0),functools.partial(Handler,directory=str(ROOT/'docs')))
threading.Thread(target=server.serve_forever,daemon=True).start()
result={}
try:
    with sync_playwright() as p:
        browser=p.chromium.launch()
        page=browser.new_page(viewport={'width':1440,'height':1000},reduced_motion='reduce')
        errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
        page.goto(f'http://127.0.0.1:{server.server_port}',wait_until='networkidle')
        expect(page.locator('.project-card')).to_have_count(11)
        expect(page.locator('.hero h1')).to_contain_text('GABRIEL')
        assert page.locator('.project-filters').count() == 0
        page.screenshot(path=str(REPORTS/'desktop.png'))
        page.locator('#apps').scroll_into_view_if_needed()
        page.screenshot(path=str(REPORTS/'projects.png'))
        links=page.locator('.project-head a').evaluate_all('(links)=>links.map(a=>a.href)')
        assert len(links)==6,links
        assert not any('/G4T0XX-VISION' in link or '/VRChat-Translator-Hub' in link or '/G4T0XX-Hybrid-FBT' in link for link in links)
        for width in (390,768,1440):
            page.set_viewport_size({'width':width,'height':844})
            page.evaluate('window.scrollTo(0,0)')
            assert page.evaluate('document.documentElement.scrollWidth<=window.innerWidth'),width
        page.set_viewport_size({'width':390,'height':844});page.screenshot(path=str(REPORTS/'mobile.png'))
        result={'projects':11,'original_design_restored':True,'private_links_excluded':True,'responsive':[390,768,1440],'runtime_errors':errors}
        assert not errors,errors
        browser.close()
finally:server.shutdown();server.server_close()
(REPORTS/'browser.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
print(json.dumps(result))
