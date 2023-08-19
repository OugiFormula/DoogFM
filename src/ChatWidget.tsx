import React, { useEffect } from 'react';

const ChatWidget: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.id = 'cid0020000353465547461';
    script.dataset.cfasync = 'false';
    script.async = true;
    script.src = '//st.chatango.com/js/gz/emb.js';
    script.style.width = '315px';
    script.style.height = '280px';

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
        q: '000000',
        r: 100,
        pos: 'bl',
        cv: 1,
        cvbg: '000000',
        cvfg: 'ffffff',
        cvw: 148,
        cvh: 26,
        ticker: 1,
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
