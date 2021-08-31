import * as THREE from 'three'
import { STLLoader } from './node_modules/three/examples/jsm/loaders/STLLoader.js'
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js'

let scene, camera, renderer, control, object

function init () {
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x444444)

  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  scene.add(object)

  control = new OrbitControls(camera, renderer.domElement)
  const light = new THREE.DirectionalLight(0xffeeee)
  light.position.set(0, 10, 10)
  scene.add(light)

  const light2 = new THREE.DirectionalLight(0xffeeee)
  light2.position.set(0, 10, -10)
  scene.add(light2)

  renderer.render(scene, camera)
}

function animate () {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

const loader = new STLLoader()

loader.load('./public/3dmodels/mando.stl', (geometry) => {
  geometry.center()
  object = new THREE.Mesh(
    geometry,
    new THREE.MeshLambertMaterial({ color: 0x44bbff })
  )

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
  )
  camera.position.z = geometry.boundingBox.min.z + 300
  object.rotation.x = -Math.PI / 2
  init()
  animate()
})
