/***********************************

> 网站名称：Falconchen V2EX屏蔽特定节点、主题等
> 脚本功能：网站净化|去广告
> 脚本作者：Falconchen
> 更新时间：2024-10-09
> 贡献投稿：https://t.me/ddgksf2013_bot
> 问题反馈：ddgksf2013@163.com

[rewrite_local]

^https?:\/\/(.*\.)?v2ex\.com url script-response-body https://raw.githubusercontent.com/falconchen/Rewrite/master/Html/V2exBlock.js
[mitm] 

hostname = v2ex.com,*.v2ex.com

***********************************/



const body = $response.body.replace(
  /<head>/,
  `<head>
    <style>
      .sidebar_units,
      .sidebar_compliance,
      div[class^="wwads-"]{
        display: none !important;
      }
    </style>
    <script>
      // console.log('V2EX Block script loaded');
      document.addEventListener('DOMContentLoaded', function() {
        // console.log('DOM fully loaded and parsed');
        const nodes = document.querySelectorAll('a[href*="go/invest"]');
        // console.log('Found ' + nodes.length + ' nodes with href containing "go/invest"');
        nodes.forEach(function(node, index) {
          // console.log('Processing node ' + (index + 1));
          const nextNode = node.nextElementSibling;
          if (nextNode && nextNode.tagName === 'STRONG') {
            // console.log('Next node is a STRONG tag');
            const memberLink = nextNode.querySelector('a[href*="/member/"]');
            if (memberLink) {
              // console.log('Found member link in STRONG tag');
              let parent = node.closest('div.cell');
              if (parent) {
                // console.log('Found parent div.cell, hiding it');
                parent.style.display = 'none';
              } else {
                // console.log('Could not find parent div.cell');
              }
            } else {
              // console.log('No member link found in STRONG tag');
            }
          } else {
            // console.log('Next node is not a STRONG tag');
          }
        });
        // console.log('Finished processing all nodes');
      });
    </script>
  `
);
$done({ body });
