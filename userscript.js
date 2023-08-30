// ==UserScript==
// @name        Fxxx AI Bot
// @name:zh     滚啊！总结Bot
// @match       *://www.bilibili.com/*
// @match       *://t.bilibili.com/*
// @match       *://space.bilibili.com/*
// @grant       none
// @version     1.1
// @author      Red_lnn
// @description 滚啊！总结Bot
// @namespace   https://github.com/Redlnn/fxxx-ai-bot
// @run-at      document-idle
// @license     AGPL-3.0-only
// @supportURL  https://github.com/Redlnn/fxxx-ai-bot
// @homepageURL https://github.com/Redlnn/fxxx-ai-bot
// ==/UserScript==

const banList = {
  summary: ['1141159409', '8455326', '234978716', '3494380876859618', '1168527940', '1358327273'],
  keyword: ['AI视频小助理', '机器工具人', '有趣的程序员', '课代表猫', 'AI课代表呀', '星崽丨StarZai'],
  list: [
    {
      name: 'AI视频小助理',
      uid: '1141159409',
      keyword: ['视频总结'],
    },
    {
      name: '机器工具人',
      uid: '8455326',
      keyword: ['听歌识曲'],
    },
    {
      name: '有趣的程序员',
      uid: '234978716',
      keyword: ['视频总结'],
    },
    {
      name: '课代表猫',
      uid: '3494380876859618',
      keyword: ['视频总结'],
    },
    {
      name: 'AI课代表呀',
      uid: '1168527940',
      keyword: ['视频总结'],
    },
    {
      name: '星崽丨StarZai',
      uid: '1358327273',
      keyword: ['视频总结', '封面提取'],
    },
  ],
}

const watchingReplyDomList = []
const watchingCommentDomList = []

// -----------------------

async function modReply(listDom, replyDom) {
  if (!replyDom.classList || !replyDom.classList.contains('reply-item')) return

  const rootReply = replyDom.querySelector('.root-reply-container')
  const subReplyList = replyDom.querySelectorAll('.sub-reply-item')

  // 查找主楼内容是否有关键词
  const rootContent = rootReply.querySelector('.reply-content')
  banList.keyword.forEach(async (keyword) => {
    if (rootContent.textContent.includes(keyword)) {
      if (subReplyList.length === 0) {
        replyDom.style.background = '#FFB7B7'
      } else {
        rootReply.style.background = '#FFB7B7'
      }

      replyDom.style.transition = 'all 0.3s'
      replyDom.style['-webkit-transition'] = 'all 0.3s'
      replyDom.style.heiht = '0'
      replyDom.style.display = 'none'

      console.warn('发现提到总结Bot的评论')
      console.log(replyDom)
    }
  })

  // 判断主楼发表用户
  const userName = replyDom.querySelector('.root-reply-container .root-reply-avatar')
  if (banList.summary.includes(userName.getAttribute('data-user-id'))) {
    if (subReplyList.length === 0) {
      replyDom.style.background = '#FFB7B7'
    } else {
      rootReply.style.background = '#FFB7B7'
    }

    replyDom.style.transition = 'all 0.3s'
    replyDom.style['-webkit-transition'] = 'all 0.3s'
    replyDom.style.heiht = '0'
    replyDom.style.display = 'none'

    console.warn('发现AI总结Bot的评论')
    console.log(replyDom)
  }

  // 判断主楼首层被@用户
  const atList = replyDom.querySelectorAll('.jump-link.user')
  if (atList.length > 0) {
    atList.forEach(async (at) => {
      if (banList.summary.includes(at.getAttribute('data-user-id'))) {
        if (subReplyList.length === 0) {
          replyDom.style.background = '#FFB7B7'
        } else {
          rootReply.style.background = '#FFB7B7'
        }

        replyDom.style.transition = 'all 0.3s'
        replyDom.style['-webkit-transition'] = 'all 0.3s'
        replyDom.style.heiht = '0'
        replyDom.style.display = 'none'

        console.warn('发现@AI总结Bot')
        console.log(replyDom)
      }
    })
  }

  if (subReplyList.length > 0) {
    subReplyList.forEach(async (subReplyDom) => {
      // 查找子评论内容是否有关键词
      const subReplyContent = subReplyDom.querySelector('.reply-content')
      banList.keyword.forEach(async (keyword) => {
        if (subReplyContent.textContent.includes(keyword)) {
          subReplyDom.style.background = '#FFB7B7'

          subReplyDom.style.transition = 'all 0.3s'
          subReplyDom.style['-webkit-transition'] = 'all 0.3s'
          subReplyDom.style.heiht = '0'
          subReplyDom.style.display = 'none'

          console.warn('发现提到总结Bot的子评论')
          console.log(replyDom)
        }
      })

      // 判断子楼发表用户
      const userName = subReplyDom.querySelector('.sub-reply-container .sub-reply-avatar')
      if (banList.summary.includes(userName.getAttribute('data-user-id'))) {
        subReplyDom.style.background = '#FFB7B7'

        subReplyDom.style.transition = 'all 0.3s'
        subReplyDom.style['-webkit-transition'] = 'all 0.3s'
        subReplyDom.style.heiht = '0'
        subReplyDom.style.display = 'none'

        console.warn('发现子评论有AI总结Bot')
        console.log(replyDom)
      }

      // 判断子楼首层被@用户
      const atList = subReplyDom.querySelectorAll('.jump-link.user')
      if (atList.length > 0) {
        atList.forEach(async (at) => {
          if (banList.summary.includes(at.getAttribute('data-user-id'))) {
            subReplyDom.style.background = '#FFB7B7'

            subReplyDom.style.transition = 'all 0.3s'
            subReplyDom.style['-webkit-transition'] = 'all 0.3s'
            subReplyDom.style.heiht = '0'
            subReplyDom.style.display = 'none'

            console.warn('发现子评论@AI总结Bot')
            console.log(replyDom)
          }
        })
      }
    })
  }
}

function watchReplyList(dom) {
  const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
  const observer = new MutationObserver(async (records, itself) => {
    records.forEach(async (record) => {
      for (let node of record.addedNodes) {
        if (node.classList && node.classList.contains('reply-item')) {
          await modReply(record.target, node)
        }
      }
    })
  })
  observer.observe(dom, { childList: true, subtree: true })
}

// -----------------------

async function modComment(listDom, commentDom) {
  if (!commentDom.classList.contains('list-item')) return

  const rootComment = commentDom.querySelector('.con')
  const subCommentList = commentDom.querySelectorAll('.reply-item')

  // 判断主楼发表用户
  const userName = commentDom.querySelector('.user-face a')
  if (banList.summary.includes(userName.getAttribute('data-usercard-mid'))) {
    if (subCommentList.length === 0) {
      commentDom.style.background = '#FFB7B7'
    } else {
      commentDom.querySelector('.con > .text').style.background = '#FFB7B7'
    }

    console.warn('发现AI总结Bot的评论')
    console.log(replyDom)
  }

  // 判断主楼首层被@用户
  const linktList = commentDom.querySelectorAll('.con > .text a')
  if (linktList.length > 0) {
    linktList.forEach(async (link) => {
      var linkAttr = link.getAttribute('data-usercard-mid')
      if (linkAttr === null) return
      if (banList.summary.includes(linkAttr)) {
        if (subCommentList.length === 0) {
          commentDom.style.background = '#FFB7B7'
        } else {
          commentDom.querySelector('.con > .text').style.background = '#FFB7B7'
        }
      }

      console.warn('发现@AI总结Bot')
      console.log(replyDom)
    })
  }

  if (subCommentList.length > 0) {
    subCommentList.forEach(async (subCommentDom) => {
      // 判断子楼发表用户
      const userName = subCommentDom.querySelector('.reply-face')
      if (banList.summary.includes(userName.getAttribute('data-usercard-mid'))) {
        subCommentDom.style.background = '#FFB7B7'

        console.warn('发现子评论有AI总结Bot')
        console.log(replyDom)
      }

      // 判断子楼首层被@用户
      const linktList = subCommentDom.querySelectorAll('.text-con a')
      if (linktList.length > 0) {
        linktList.forEach(async (link) => {
          var linkAttr = link.getAttribute('data-usercard-mid')
          if (linkAttr === null) return
          if (banList.summary.includes(linkAttr)) {
            subCommentDom.style.background = '#FFB7B7'

            console.warn('发现子评论@AI总结Bot')
            console.log(replyDom)
          }
        })
      }
    })
  }
}

// function watchCommentList(dom) {
//   const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
//   const observer = new MutationObserver(async (records, itself) => {
//     records.forEach(async (record) => {
//       for (let node of record.addedNodes) {
//         if (node.classList && node.classList.contains('list-item')) {
//           await modComment(record.target, node)
//         }
//       }
//     })
//   })
//   observer.observe(dom, { childList: true, subtree: true })
// }

// -----------------------

;(async function () {
  console.log('%c "@bot Cleaner" is loaded! ', 'font-size:16px;font-weight:bold;color:black;background:#f7971e')

  if (['www.bilibili.com', 't.bilibili.com'].includes(document.domain)) {
    setInterval(() => {
      var replayListDoms = document.querySelectorAll('.reply-list')
      if (replayListDoms.length > 0) {
        replayListDoms.forEach(async (replayListDom) => {
          if (!watchingReplyDomList.includes(replayListDom)) {
            watchingReplyDomList.push(replayListDom)
            replayListDom.childNodes.forEach(async (node) => {
              if (node.classList && node.classList.contains('reply-item')) {
                await modReply(replayListDom, node)
              }
            })
            watchReplyList(replayListDom)
          }
        })
      }
    }, 1000)
  }

  // 由于子评论翻页无法被主楼的MutationObserver监视，直接使用暴力刷新~
  if (document.domain === 'space.bilibili.com') {
    setInterval(() => {
      var commentListDoms = document.querySelectorAll('.comment-list')
      if (commentListDoms.length > 0) {
        commentListDoms.forEach(async (commentListDom) => {
          watchingCommentDomList.push(commentListDom)
          commentListDom.childNodes.forEach(async (node) => {
            if (node.classList && node.classList.contains('list-item')) {
              await modComment(commentListDom, node)
            }
          })
        })
      }
    }, 1000)
  }
})()
