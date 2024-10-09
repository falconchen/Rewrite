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
      div[class^="wwads-"],.adsbygoogle{
        display: none !important;
      }
    </style>
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        const nodeSlugs = ['invest','mmm']; // 屏蔽节点slug名
        const paths = nodeSlugs.map(function(slug) {
          return 'a[href*="/go/' + slug + '"]';
        }).join(',');
        
        const nodes = document.querySelectorAll(paths);
        nodes.forEach(function(node) {
          const nextNode = node.nextElementSibling;
          if (nextNode && nextNode.tagName === 'STRONG') {
            const memberLink = nextNode.querySelector('a[href*="/member/"]');
            if (memberLink) {
              let parent = node.closest('div.cell');
              if (parent) {
                parent.style.display = 'none';
              }
            }
          }
        });

      });
    </script>
  `
);
$done({ body });
