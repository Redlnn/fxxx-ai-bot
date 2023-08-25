// ==UserScript==
// @name        Fxxx AI Bot
// @name:zh     滚啊！总结Bot
// @match       *://www.bilibili.com/*
// @match       *://t.bilibili.com/*
// @grant       none
// @version     1.0
// @author      Red_lnn
// @description 滚啊！总结Bot
// @namespace   https://github.com/Redlnn/fxxx-ai-bot
// @run-at      document-idle
// ==/UserScript==

const banList = {
  summary: ['1141159409', '8455326', '234978716', '3494380876859618', '1168527940', '1358327273'],
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

async function modReply(listDom, replyDom) {
  if (!replyDom.classList.contains('reply-item')) return

  const rootReply = replyDom.querySelector('.root-reply-container')
  const subReplyList = replyDom.querySelectorAll('.sub-reply-item')

  // 判断主楼发表用户
  const userName = replyDom.querySelector('.root-reply-container .root-reply-avatar')
  if (banList.summary.includes(userName.getAttribute('data-user-id'))) {
    if (subReplyList.length === 0)
    {
      replyDom.style.background = '#FFB7B7'
    }
    else
    {
      rootReply.style.background = '#FFB7B7'
    }
  }
  else
  {
    replyDom.style.background = '#D4E2D4'
  }

  // 判断主楼首层被@用户
  const atList = replyDom.querySelectorAll('.jump-link.user')
  if (atList.length === 0) return
  atList.forEach(async (at) => {
    if (banList.summary.includes(at.getAttribute('data-user-id'))) {
      if (subReplyList.length === 0)
      {
        replyDom.style.background = '#FFB7B7'
      }
      else
      {
        rootReply.style.background = '#FFB7B7'
      }
    }
  })

  if (subReplyList.length > 0) {
    subReplyList.forEach(async (subReplyDom) => {
      // 判断子楼发表用户
      const userName = subReplyDom.querySelector('.sub-reply-container .sub-reply-avatar')
      if (banList.summary.includes(userName.getAttribute('data-user-id'))) {
        subReplyDom.style.background = '#FFB7B7'
      }

      // 判断子楼首层被@用户
      const atList = subReplyDom.querySelectorAll('.jump-link.user')
      if (atList.length == 0) return
      atList.forEach(async (at) => {
        if (banList.summary.includes(at.getAttribute('data-user-id'))) {
          subReplyDom.style.background = '#FFB7B7'
        }
      })
    })
  }
}

function watchReplyList(dom) {
  const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
  const observer = new MutationObserver(async (records, itself) => {
    records.forEach(async (record) => {
      for (let node of record.addedNodes) {
        if (node.classList.contains('reply-item')) {
          await modReply(record.target, node)
        }
      }
    })
  })
  observer.observe(dom, { childList: true, subtree: true })
}

;(async function () {
  console.log('%c "@bot Cleaner" is loaded! ', 'font-size:16px;font-weight:bold;color:black;background:#f7971e')

  setInterval(() => {
    var replayListDoms = document.querySelectorAll('.reply-list')
    if (replayListDoms) {
      replayListDoms.forEach(async (replayListDom) => {
        if (!watchingReplyDomList.includes(replayListDom)) {
          watchingReplyDomList.push(replayListDom)
          replayListDom.childNodes.forEach(async (node) => {
            if (node.classList.contains('reply-item')) {
              await modReply(replayListDom, node)
            }
          })
          watchReplyList(replayListDom)
        }
      })
    }
  }, 1000)
})()
