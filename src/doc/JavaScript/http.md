## HTTP 和 HTTPS

1. HTTP 和 HTTPS 的基本概念
   + http 是一个客户端和服务端请求和应答的标准（tcp），用于从 www 服务器传输超文本到本地浏览器超文本传输协议。
   + https 是以安全为目标的 http 通道，即 http 加入 ssl 层进行加密，其作用是 建立一个信息安全通道，来确保数据的传输，保证网站的真实性。
2. HTTP 和 HTTPS 的区别及有优缺点
   + http 是超本文传输协议，但是信息是明文传输，https 协议 要比 http安全。https 是具有安全新的 ssl 加密传输协议，可防止数据在传输过程中被窃取、改变、确保数据的完整性（当然这种安全性并非绝对的，对于更深入的 web 安全问题，再议）
   + http 协议的默认端口为 80， https 的默认端口 443
   + http 的连接很简单，是无状态的。https 握手阶段比较费时，会增加页面加载时间。
   + https 缓存不如http高效，会增加数据开销。
   + https 协议需要证书，存在一定费用。
   + ssl 证书需要绑定ip，不能在同一个 ip 绑定多个域名，ipv4 资源支持不了这种消耗。
3. https 协议的工作原理 客户端在使用 https 方式与 web 服务器通信时有一下几个步骤
   + 客户端使用 https url 访问服务器，则要求 web 服务器 建立 ssl 链接。
   + web 服务器接收到客户端的请求之后，会把网站的证书（证书当中包含了公钥），传输给客户端。
   + 客户端和web服务器端协商 ssl 链接的安全等级，也就是加密等级。
   + 客户端浏览器通过双方协商一致的安全等级，建立会话密钥，然后通过网站的公钥来加密会话密钥，并传送给网站。
   + web 服务器 通过自己的私钥解除会话密钥。
   + web 服务器 通过会话密钥加密和客户端之间的通信。

## tcp 三次握手 连接服务

 1. 第一次握手 建立链接时，客户端发送syn包（syn=j）到服务器，并进入SYN_SENT状态，等待服务器确认。SYN：同步序列编号（Synchronize Sequence Numbers）
 2. 第二次握手 服务器收到syn包并确认客户的SYN（ack=j+1），同时也发送一个自己的SYN包（syn=k），即SYN+ACK包，此时服务器进入SYN_RECV状态
 3. 第三次握手 客户端收到服务器的syn包，向服务器发送确认包ACK（ack=k+1），此包发送完毕，客户端和服务器进入ESTABLISHED（TCP连接成功）状态，完成三次握手。

    握手过程中传输的包里不包含数据，三次握手完毕后，客户端和服务器才正式开始传输数据。

## tcp 四次挥手 断开服务

  1. 客户端进程发出连接释放报文，并且停止发送数据，释放数据报文首部，fin=1，其序列号为seq=u（等于前面已经传送过来的数据的最后一个字节的序号加1），此时客户端进入 fin-wait-1（终止等待1）状态  tcp 规定，fin报文段及时不携带数据，也要消耗一个报文。
  2. 服务器收到连接释放报文，发出确认报文，ack=1，ack=u+1，并且带上自己的序列号seq=v，此时处于半关闭状态，即客户端已经没有数据要发送了，但是服务器若发送数据，客户端依然要接受。这个状态还要持  一段时间，也就是整个close-wait状态持续的时间。
  3. 客户端收到服务器的确认请求后，此时，客户端就进入fin-wait-2（终止状态2）状态，等待服务器发送链接释放报文（在这之前还需要接受服务器发送的最后的数据）。
  4. 服务器讲最后的数据发送完毕后，此时客户端就进入last-ack（最后确认状态，等待客户端的确认）。
  5. 客户端收到服务器的链接释放报文后，必须发出确认，ack=1，ack=w+1，而自己的的序列号是seq=u+1，此时，客户端就进入了TIME-WAIT（时间等待）状态。注意此时 tcp 连接还没有释放，必须经过2**MSL（最长报文段寿命）的时间后，当客户端撤销响应的 tcb 后，才进入closed 状态

## tcp 和 udp 的区别

  1. tcp 是面向链接的，而 udp 是面向无连接的。
  2. tcp 仅支持 单播传输，udp 提供了 单播，多播，广播的功能。
  3. tcp 的三次握手保证了连接的可靠性。udp 是无连接的、不可靠的一种数据传输协议，首先不可靠性体现在无连接上，通讯都不需要建立连接，对接收到的数据也不发送确认信号，发送端不知道数据是否会正确接收。
  4. udp 的头部开销比 tcp 的更小，数据传输速率更好，实时性更好。

## http 请求跨域问题

 1. 跨域的原理
    + 跨域，是指浏览器不能执行其他网站的脚本。它是由浏览器的同源策略造成的。
    + 同源策略，是指浏览器对 JavaScript 实施的安全限制，只是协议、域名、端口有任何一个不同，都被当做是不同的域。
    + 跨域原理，即是通过各种方式，避开浏览器的安全限制。

 2. 解决方案
    + jsonp，创建 script 标签，src 设置接口地址，接口参数必须自带一个回调函数名，通过定义函数名去接受返回的数据。
    + CORS CORS(Cross-origin resource sharing)跨域资源共享 服务器设置对CORS的支持原理：服务器设置Access-Control-Allow-Origin HTTP响应头之后，浏览器将会允许跨域请求
    + proxy 代理，目前常用方式
    + window.postMessage() 利用 h5 新特性 window.postMessage()

## 


