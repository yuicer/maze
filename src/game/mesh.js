var meshArray = []
var mesh = {
  wall_material: {},
  init() {
    this.box()
    this.maze()
    this.crystal()
  },
  meshMaterial(img_src) {
    var loader = new THREE.TextureLoader()
    var img = require('@/assets/' + img_src)
    var wall_material = new Physijs.createMaterial(
      new THREE.MeshLambertMaterial({
        map: loader.load(img),
        side: THREE.DoubleSide
      }),
      0.4, // low friction
      0.8 // high restitution
    )
    wall_material.map.wrapS = wall_material.map.wrapT = THREE.RepeatWrapping
    return wall_material
  },
  box() {
    var box_material = this.meshMaterial('wood.jpg')
    box_material.map.repeat.set(0.25, 0.25)

    var geo = new THREE.BoxGeometry(4, 10, 4)
    var box = new Physijs.ConvexMesh(
      geo,
      box_material
    )
    box.position.y = 80
    box.position.x = 0
    box.castShadow = true
    box.receiveShadow = true
    box.position.set(375, 5, 800 - 20)
    meshArray.push(box)
  },
  wall(type, length) {
    var wall_material = mesh.meshMaterial('wall.jpg')
    wall_material.map.repeat.set(2, 2)
    var wall = new Physijs.BoxMesh(
      new THREE.BoxGeometry(500, 10, length),
      wall_material,
      0 // mass
    )
    wall.receiveShadow = true
    wall.castShadow = true
    //type 0横 1竖
    if (type)
      wall.rotation.z = Math.PI / 2
    else
      wall.rotation.set(0, Math.PI / 2, Math.PI / 2)
    wall.position.y = 250
    meshArray.push(wall)
    return wall
  },
  crystal: function () {
    function addShape(shape, extrudeSettings, color, x, y, z, rx, ry, rz, s) {
      var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
      for (let i = 0, l = geometry.vertices.length; i < l; i++) {
        geometry.vertices[i].x *= 0.2
        geometry.vertices[i].y *= 0.2
        geometry.vertices[i].z *= 0.2
      }
      var meshMaterial = new THREE.MeshNormalMaterial()
      var mesh = new Physijs.ConvexMesh(geometry, meshMaterial)

      mesh.position.set(x, y, z)
      mesh.rotation.set(rx, ry, rz)
      //  mesh.scale.set(s, s, s)
      //  mesh.scale.set(.2, .2, .2)
      mesh.position.y = 20
      mesh.castShadow = true
      mesh.position.set(375, 4, 120 + 5)
      meshArray.push(mesh)
    }

    var hexShape = new THREE.Shape()
    hexShape.moveTo(0, 0.8)
    hexShape.lineTo(0.4, 0.5)
    hexShape.lineTo(0.3, 0)
    hexShape.lineTo(-0.3, 0)
    hexShape.lineTo(-0.4, 0.5)
    hexShape.lineTo(0, 0.8)

    var numberOfCrystals = 1
    for (let i = 0; i < numberOfCrystals; i++) {
      var extrudeSettings = {
        amount: Math.random() * 200,
        bevelEnabled: true,
        bevelSegments: 1,
        steps: 1,
        bevelSize: (Math.random() * 10) + 10,
        bevelThickness: (Math.random() * 10) + 25
      }

      addShape(
        hexShape,
        extrudeSettings,
        0xff3333, // color
        0, // x pos
        0, // y pos
        0, // z pos
        Math.random() * 2 * Math.PI, // x rotation
        Math.random() * 2 * Math.PI, // y rotation
        Math.random() * 2 * Math.PI, // z rotation
        1
      )
    }
  },
  maze() {
    var me = this

    var ground_material = this.meshMaterial('floor.png')
    ground_material.map.repeat.set(12, 12)
    var ground = new Physijs.BoxMesh(
      new THREE.BoxGeometry(1000, 1, 1000),
      ground_material,
      0 // mass
    )
    ground.receiveShadow = true
    ground.position.set(500, 0, 500)
    meshArray.push(ground)

    var b0 = new me.wall(0, 50)
    b0.position.add(new THREE.Vector3(375, 0, 800))
    //边界
    var a1 = new me.wall(1, 200)
    a1.position.add(new THREE.Vector3(350, 0, 700))
    var a2 = new me.wall(1, 200)
    a2.position.add(new THREE.Vector3(400, 0, 700))
    var b1 = new me.wall(0, 150)
    b1.position.add(new THREE.Vector3(275, 0, 600))
    var b2 = new me.wall(0, 150)
    b2.position.add(new THREE.Vector3(475, 0, 600))

    var a8 = new me.wall(1, 600)
    a8.position.add(new THREE.Vector3(550, 0, 300))

    var b5 = new me.wall(0, 100)
    b5.position.add(new THREE.Vector3(150, 0, 450))
    var a3 = new me.wall(1, 150)
    a3.position.add(new THREE.Vector3(200, 0, 525))

    //正方形
    var b3 = new me.wall(0, 100)
    b3.position.add(new THREE.Vector3(300, 0, 550))
    var a5 = new me.wall(1, 100)
    a5.position.add(new THREE.Vector3(350, 0, 500))
    var b6 = new me.wall(0, 100)
    b6.position.add(new THREE.Vector3(300, 0, 450))
    var a4 = new me.wall(1, 100)
    a4.position.add(new THREE.Vector3(250, 0, 500))
    //正方形
    var b4 = new me.wall(0, 100)
    b4.position.add(new THREE.Vector3(450, 0, 550))
    var a7 = new me.wall(1, 100)
    a7.position.add(new THREE.Vector3(500, 0, 500))
    var b7 = new me.wall(0, 100)
    b7.position.add(new THREE.Vector3(450, 0, 450))
    var a6 = new me.wall(1, 100)
    a6.position.add(new THREE.Vector3(400, 0, 500))

    var a9 = new me.wall(1, 150)
    a9.position.add(new THREE.Vector3(100, 0, 375))
    var a10 = new me.wall(1, 100)
    a10.position.add(new THREE.Vector3(150, 0, 350))
    var a11 = new me.wall(1, 100)
    a11.position.add(new THREE.Vector3(500, 0, 350))

    var b8 = new me.wall(0, 350)
    b8.position.add(new THREE.Vector3(325, 0, 400))
    var b10 = new me.wall(0, 350)
    b10.position.add(new THREE.Vector3(325, 0, 300))
    var b9 = new me.wall(0, 100)
    b9.position.add(new THREE.Vector3(50, 0, 300))

    var b11 = new me.wall(0, 300)
    b11.position.add(new THREE.Vector3(200, 0, 250))
    var b12 = new me.wall(0, 100)
    b12.position.add(new THREE.Vector3(450, 0, 250))
    var b13 = new me.wall(0, 100)
    b13.position.add(new THREE.Vector3(375, 0, 100))
    var b14 = new me.wall(0, 250)
    b14.position.add(new THREE.Vector3(175, 0, 50))
    var b15 = new me.wall(0, 50)
    b15.position.add(new THREE.Vector3(475, 0, 50))

    var a12 = new me.wall(1, 300)
    a12.position.add(new THREE.Vector3(0, 0, 150))
    var a13 = new me.wall(1, 200)
    a13.position.add(new THREE.Vector3(50, 0, 150))
    var a14 = new me.wall(1, 150)
    a14.position.add(new THREE.Vector3(350, 0, 175))
    var a15 = new me.wall(1, 150)
    a15.position.add(new THREE.Vector3(400, 0, 175))
    var a16 = new me.wall(1, 200)
    a16.position.add(new THREE.Vector3(500, 0, 150))

    var a17 = new me.wall(1, 50)
    a17.position.add(new THREE.Vector3(300, 0, 25))
    var a18 = new me.wall(1, 50)
    a18.position.add(new THREE.Vector3(450, 0, 25))
    var b16 = new me.wall(0, 300)
    b16.position.add(new THREE.Vector3(150, 0, 0))
    var b17 = new me.wall(0, 100)
    b17.position.add(new THREE.Vector3(500, 0, 0))
  }
}

mesh.init()
export default meshArray
