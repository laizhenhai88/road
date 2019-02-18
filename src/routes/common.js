import React, {Component} from 'react'
import axios from 'axios'

class MyComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.m = document.getElementById('master')
    this.s = document.getElementById('slave')
    this.goal = document.body.clientWidth - this.m.offsetLeft - 50
    this.oriLeft = this.m.offsetLeft
    this.road = []

    /**
    https://ssl.captcha.qq.com/template/wireless_mqq_captcha.html?style=simple&aid=16&uin=1754235150&cap_cd=Qz-4Q7iyiDFrj9FfdyS9mSipDL8502ScTRKCx2O1L0UNrazDlRW3-g**&clientype=1&apptype=2
    clientX 距离网页可视区域的坐标，不包括浏览器的菜单栏等，组件随着滚动条滚动，则clientX会变化
    pageX 距离网页文档的坐标，组件随着滚动条滚动，则pageX不会变化
    screenX screenY 距离屏幕的坐标，包括浏览器的菜单栏等非网页内容区域
    touches: 当前屏幕上所有触摸点的列表;
    targetTouches: 当前对象上所有触摸点的列表;
    changedTouches: 涉及当前(引发)事件的触摸点的列表
    **/

    this.m.addEventListener('touchstart', (e) => {
      this.preTime = new Date().getTime()
      this.road = [this.convertTouchEventToJSON(e)]
    }, {passive: true})

    this.m.addEventListener('touchmove', (e) => {
      // console.log(e)
      // e.preventDefault()
      let now = new Date().getTime()
      this.preTime = now

      this.road.push(this.convertTouchEventToJSON(e))
      let newLeft = this.oriLeft + e.changedTouches[0].pageX - this.road[0].pageX
      this.m.style.left = newLeft + 'px'
      this.s.style.left = this.m.style.left
    }, {passive: true})

    this.m.addEventListener('touchend', async (e) => {
      // console.log(e)
      // e.preventDefault()

      this.road.push(this.convertTouchEventToJSON(e))
      this.oriLeft = this.m.offsetLeft
      if (Math.abs(this.m.offsetLeft - this.goal) < 5) {
        // success
        await axios.post('/api/road/save', this.road)
      }
      window.location.reload()
    }, {passive: true})
  }

  convertTouchEventToJSON(e) {
    return {
      // type: e.type,
      timeStamp: e.timeStamp,
      pageX: e.changedTouches[0].pageX,
      pageY: e.changedTouches[0].pageY,
      // clientX: e.changedTouches[0].clientX,
      // clientY: e.changedTouches[0].clientY,
      // screenX: e.changedTouches[0].screenX,
      // screenY: e.changedTouches[0].screenY,
      radiusX: e.changedTouches[0].radiusX,
      radiusY: e.changedTouches[0].radiusY,
      rotationAngle: e.changedTouches[0].rotationAngle,
      force: e.changedTouches[0].force
    }
  }

  render() {
    return (<div style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'black'
      }}>
      <div style={{
          width: '80%',
          height: '100%',
          backgroundColor: 'orange',
          margin: '0px auto'
        }}></div>
      <div id='slave' style={{
          width: 50,
          height: 50,
          position: 'absolute',
          backgroundColor: 'red',
          top: 100,
          left: '10%'
        }}>
      </div>
      <div id='master' style={{
          width: 50,
          height: 50,
          position: 'absolute',
          backgroundColor: 'green',
          top: 300,
          left: '10%'
        }}></div>
    </div>)
  }
}

export default MyComponent
