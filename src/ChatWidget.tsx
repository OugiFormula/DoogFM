import React, { useEffect } from 'react';

const ChatWidget: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.id = 'cid0020000353449558353';
    script.dataset.cfasync = 'false';
    script.async = true;
    script.src = '//st.chatango.com/js/gz/emb.js';
    script.style.width = '257px';
    script.style.height = '331px';

    const scriptConfig = {
      handle: 'doogfm',
      arch: 'js',
      styles: {
        a: '000000',
        b: 100,
        c: 'FFFFFF',
        d: 'FFFFFF',
        k: '000000',
        l: '000000',
        m: '000000',
        n: 'FFFFFF',
        p: '10',
        q: '000000',
        r: 100,
        t: 0,
        usricon: 0,
        pos: 'bl',
        cv: 1,
        cvbg: '000000',
        cvw: 100,
        cvh: 18,
        surl: 0,
        cnrs: '0.35',
        ticker: 1,
        fwtickm: 1,
      },
    };

    script.innerHTML = JSON.stringify(scriptConfig);

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="chat-widget-container"></div>;
};

export default ChatWidget;
