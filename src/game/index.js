import light from './light.js'
import mesh from './mesh.js'
// import move from './move.js'

var scene, camera, renderer
init()
animate()

function init() {
  scene = new Physijs.Scene()
  scene.setGravity(new THREE.Vector3(0, -30, 0))

  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("canvas")
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  scene.add(light)
  for (let i = 0; i < mesh.length; i++) {
    scene.add(mesh[i])
  }
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
  camera.position.add(new THREE.Vector3(0, 10, 15))
  mesh[0].add(camera)
}

function animate() {
  requestAnimationFrame(animate)
  scene.simulate()
  renderer.render(scene, camera)
}

import text from './text.js'

var move = {
  yuusya: {},
  dom: {},
  event: [],
  clock: {},
  //move
  move_speed: 0.4, //0.4 1分钟走完1000
  left: false,
  right: false,
  forward: false,
  back: false,
  move: false,
  jump: false,
  jump_height: 0,
  jump_enable: true,
  //rotate
  angelX: 0,
  angelY: 0,
  //		上一步的鼠标位置
  mouse_vector: new THREE.Vector3(0, 0, 0),
  rotate_speed: 0.005,

  init: function () {
    //init const
    var me = this
    me.yuusya = mesh[0]
    me.dom = document.getElementById('canvas')
    me.clock = new THREE.Clock()
    me.clock.start()
    move.keyboard()
    move.mouse()
    scene.addEventListener('update', move.action)
  },

  action: function () {
    var me = move
    me.yuusya.__dirtyPosition = true
    me.yuusya.__dirtyRotation = true

    //移动
    if (me.move) {
      var vector = new THREE.Vector3(0, 0, 0)
      //化简啥的以后再说吧
      if (me.forward) {
        if (Math.abs(me.yuusya.rotation.z) > 2.4)
          vector.add(new THREE.Vector3(-Math.sin(Math.PI - me.yuusya.rotation.y) * me.move_speed, 0, -Math.cos(Math.PI - me.yuusya.rotation.y) * me.move_speed))
        else
          vector.add(new THREE.Vector3(-Math.sin(me.yuusya.rotation.y) * me.move_speed, 0, -Math.cos(me.yuusya.rotation.y) * me.move_speed))
      }
      if (me.left) {
        if (Math.abs(me.yuusya.rotation.z) > 2.4)
          vector.sub(new THREE.Vector3(-Math.sin(-me.yuusya.rotation.y + Math.PI / 2) * me.move_speed, 0, -Math.cos(-me.yuusya.rotation.y + Math.PI / 2) * me.move_speed))
        else
          vector.add(new THREE.Vector3(-Math.sin(me.yuusya.rotation.y + Math.PI / 2) * me.move_speed, 0, -Math.cos(me.yuusya.rotation.y + Math.PI / 2) * me.move_speed))
      }
      if (me.right) {
        if (Math.abs(me.yuusya.rotation.z) > 2.4)
          vector.sub(new THREE.Vector3(-Math.sin(-me.yuusya.rotation.y + Math.PI / 2 * 3) * me.move_speed, 0, -Math.cos(-me.yuusya.rotation.y + Math.PI / 2 * 3) * me.move_speed))
        else
          vector.add(new THREE.Vector3(-Math.sin(me.yuusya.rotation.y - Math.PI / 2) * me.move_speed, 0, -Math.cos(me.yuusya.rotation.y - Math.PI / 2) * me.move_speed))
      }
      if (me.back) {
        if (Math.abs(me.yuusya.rotation.z) > 2.4)
          vector.add(new THREE.Vector3(Math.sin(Math.PI - me.yuusya.rotation.y) * me.move_speed, 0, Math.cos(Math.PI - me.yuusya.rotation.y) * me.move_speed))
        else
          vector.add(new THREE.Vector3(Math.sin(me.yuusya.rotation.y) * me.move_speed, 0, Math.cos(me.yuusya.rotation.y) * me.move_speed))
      }

      me.yuusya.position.add(vector)
    }

    //转动,鼠标移到边缘后一直转动
    if (me.mouse_vector.x > 0.9) {
      me.yuusya.rotateOnAxis(new THREE.Vector3(0, -1, 0), me.rotate_speed * 6)
    } else if (me.mouse_vector.x < -0.9) {
      me.yuusya.rotateOnAxis(new THREE.Vector3(0, 1, 0), me.rotate_speed * 6)
    }
    if (me.mouse_vector.y > 0.9 && camera.rotation.x < Math.PI / 4)
      camera.rotateOnAxis(new THREE.Vector3(1, 0, 0), me.rotate_speed * 6)
    else if (me.mouse_vector.y < -0.9 && camera.rotation.x > -Math.PI / 6)
      camera.rotateOnAxis(new THREE.Vector3(-1, 0, 0), me.rotate_speed * 6)


    //跳
    if (me.jump) {
      me.jump_height += .1
      if (me.jump_height < 3) {
        me.yuusya.position.y += 0.15
        //me.jump_height 只是一个计数器
      } else if (me.jump_height > 6.5) {
        me.jump = false
        me.jump_enable = true
        me.jump_height = 0
      }
    }

    // //判断位置出现文本
    // //探索
    // if (!vs.kaiwa_show && me.yuusya.position.z > 700 && me.yuusya.position.z < 750 && me.yuusya.position.x < 400 && me.yuusya.position.x > 350 && vs.death == 0 && !vs.win)
    //   if (text[0]['a1'][text[0]['a1'].length - 1] != '') {
    //     vs.kaiwa(0, 'a1', 100)
    //   }

    // //
    // if (!vs.kaiwa_show && me.yuusya.position.z > 550 && me.yuusya.position.z < 600 && me.yuusya.position.x < 400 && me.yuusya.position.x > 350 && vs.death == 0 && !vs.win)
    //   if (text[0]['a2'][text[0]['a2'].length - 1] != '')
    //     vs.kaiwa(0, 'a2', 100)


    // //迷宫通关，到达史莱姆
    // if (!vs.kaiwa_show && me.yuusya.position.z < 250 && me.yuusya.position.x < 400 && me.yuusya.position.x > 350 && !vs.win) {
    //   switch (vs.death) {
    //     case 0:
    //       if (text[1]['a1'][text[1]['a1'].length - 1] != '')
    //         vs.kaiwa(1, 'a1', 300)
    //       break
    //     case 1:
    //       if (text[1]['a2'][text[1]['a2'].length - 1] != '')
    //         vs.kaiwa(1, 'a2', 300)
    //       break
    //     case 2:
    //     case 3:
    //     case 4:
    //       if (text[1]['a3'][text[1]['a3'].length - 1] != '')
    //         vs.kaiwa(1, 'a3', 300)
    //       break
    //     case 5:
    //       if (text[1]['a4'][text[1]['a4'].length - 1] != '')
    //         vs.kaiwa(1, 'a4', 100)
    //       else if (text[1]['a5'][text[1]['a5'].length - 1] != '')
    //         vs.kaiwa(1, 'a5', 300)
    //       break

    //   }
    // }

    // //死了回到原点
    // if (!vs.kaiwa_show && me.yuusya.position.z > 700 && me.yuusya.position.z < 750 && me.yuusya.position.x < 400 && me.yuusya.position.x > 350 && !vs.win) {
    //   switch (vs.death) {
    //     case 1:
    //       if (text[2]['a1'][text[2]['a1'].length - 1] != '')
    //         vs.kaiwa(2, 'a1', 100)
    //       break
    //     case 2:
    //       if (text[2]['a2'][text[2]['a2'].length - 1] != '')
    //         vs.kaiwa(2, 'a2', 100)
    //       break
    //     case 3:
    //     case 4:
    //       if (text[2]['a3'][text[2]['a3'].length - 1] != '')
    //         vs.kaiwa(2, 'a3', 100)
    //       break
    //     case 5:
    //       if (text[2]['a4'][text[2]['a4'].length - 1] != '')
    //         vs.kaiwa(2, 'a4', 100)
    //       break
    //   }
    // }


    // //过了很长时间没过迷宫
    // //2分钟
    // if (!vs.kaiwa_show && vs.death < 1 && !vs.win) {
    //   if (me.clock.getElapsedTime() > 300)
    //     if (text[3]['a1'][text[3]['a1'].length - 1] != '')
    //       vs.kaiwa(3, 'a1', 100)
    //   else if (text[3]['a1'][text[3]['a1'].length - 1] == '') {
    //     vs.lost = true
    //     vm.$router.push('/')
    //   } else if (me.clock.getElapsedTime() > 180)
    //     if (text[3]['a2'][text[3]['a2'].length - 1] != '')
    //       vs.kaiwa(3, 'a2', 100)
    //   else if (me.clock.getElapsedTime() > 120)
    //     if (text[3]['a3'][text[3]['a3'].length - 1] != '')
    //       vs.kaiwa(3, 'a3', 100)

    // }

    // if (vs.win && !vs.kaiwa_show) {
    //   if (text[4]['a1'][text[4]['a1'].length - 1] != '')
    //     vs.kaiwa(4, 'a1', 300)
    //   else if (text[4]['a2'][text[4]['a2'].length - 1] != '')
    //     vs.kaiwa(4, 'a2', 100)
    //   else if (text[4]['a3'][text[4]['a3'].length - 1] != '')
    //     vs.kaiwa(4, 'a3', 300)
    //   else if (text[4]['a4'][text[4]['a4'].length - 1] != '')
    //     vs.kaiwa(4, 'a4', 100)
    //   else if (text[4]['a5'][text[4]['a5'].length - 1] != '')
    //     vs.kaiwa(4, 'a5', 200)
    //   else
    //     vm.$router.push('/')
    // }
    // if (vs.mercy == 2 && !vs.kaiwa_show) {
    //   if (text[5]['a1'][text[5]['a1'].length - 1] != '')
    //     vs.kaiwa(5, 'a1', 280)
    //   else if (text[5]['a2'][text[5]['a2'].length - 1] != '') {
    //     vs.kaiwa(5, 'a2', 200)
    //     vm.$router.push('/')
    //   }
    // }

  },
  //绑定事件
  keyboard: function () {
    var me = this
    me.event[0] = function (event) {
      switch (event.keyCode) {
        case 65: // left
          me.left = true
          break
        case 87: // forward
          me.forward = true
          break
        case 68: // right
          me.right = true
          break
        case 83: // back
          me.back = true
          break
        case 32: // jump
          if (me.jump_enable) {
            me.jump = true
            me.jump_enable = false
          }
      }
      if (me.left || me.forward || me.right || me.back)
        me.move = true
    }
    me.dom.addEventListener('keydown', me.event[0])

    me.event[1] = function (event) {
      switch (event.keyCode) {
        case 65: // left
          me.left = false
          break
        case 87: // forward
          me.forward = false
          break
        case 68: // right
          me.right = false
          break
        case 83: // back
          me.back = false
          break
      }
      if (!me.left && !me.forward && !me.right && !me.back)
        me.move = false

    }
    me.dom.addEventListener('keyup', me.event[1])
  },
  mouse: function () {
    var me = this
    me.dom.addEventListener('mousemove', function (event) {
      me.yuusya.__dirtyPosition = true
      me.yuusya.__dirtyRotation = true
      var vector = new THREE.Vector3((event.clientX / me.dom.clientWidth) * 2 - 1, -((event.clientY / me.dom.clientHeight) * 2 - 1), 0)
      //角度控制
      if (vector.x > me.mouse_vector.x && Math.abs(vector.x) <= 0.9)
        me.yuusya.rotateOnAxis(new THREE.Vector3(0, -1, 0), me.rotate_speed)
      else if (vector.x < me.mouse_vector.x && Math.abs(vector.x) <= 0.9)
        me.yuusya.rotateOnAxis(new THREE.Vector3(0, 1, 0), me.rotate_speed)

      if (vector.y > me.mouse_vector.y && camera.rotation.x < Math.PI / 4)
        camera.rotateOnAxis(new THREE.Vector3(1, 0, 0), me.rotate_speed)
      else if (vector.y < me.mouse_vector.y && camera.rotation.x > -Math.PI / 6)
        camera.rotateOnAxis(new THREE.Vector3(-1, 0, 0), me.rotate_speed)

      me.mouse_vector = vector
    })
  }
}

move.init()
