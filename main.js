import * as THREE from 'three'
import { STLLoader } from './node_modules/three/examples/jsm/loaders/STLLoader.js'
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js'

const canvasContainer = document.querySelector('.container')
const width = canvasContainer.offsetWidth
const height = canvasContainer.offsetHeight
const minSize = width > height ? height : width

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xefefef)
scene.fog = new THREE.Fog(0xefefef, 1, 500)

const camera = new THREE.PerspectiveCamera(
  75,
  minSize / minSize,
  0.1,
  10000
)

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('app'),
  antialias: true
})
renderer.setSize(minSize, minSize)
renderer.setPixelRatio(window.devicePixelRatio)

window.addEventListener('resize', () => {
  const canvasContainer = document.querySelector('.container')
  const width = canvasContainer.offsetWidth
  const height = canvasContainer.offsetHeight
  const minSize = width > height ? height : width
  camera.aspect = minSize / minSize
  renderer.setSize(minSize, minSize)
})

// ADD Lights
const frontLight = new THREE.DirectionalLight(0xffeedf)
frontLight.position.set(0, 1, 1)

const backLight = new THREE.DirectionalLight(0xffeedf)
backLight.position.set(0, 1, -1)

const stlLoader = new STLLoader()

const stls = [
  './3dmodels/byoda.stl',
  './3dmodels/mando.stl'
]

stlLoader.load(stls[1], (geometry) => {
  geometry.center()
  const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshLambertMaterial({ color: 0xffeeee })
  )

  geometry.computeBoundingSphere() // We need to computeBoundingSphere or it is null by default
  camera.position.z = geometry.boundingSphere.radius * 1.7 // We double the boundingSphere radius
  camera.position.y = 10
  const control = new OrbitControls(camera, renderer.domElement)

  mesh.rotation.x = -Math.PI / 2
  // const floor = new THREE.Mesh(
  //   new THREE.PlaneGeometry(geometry.boundingSphere.radius * 100, geometry.boundingSphere.radius * 100, geometry.boundingSphere.radius * 10, geometry.boundingSphere.radius * 10),
  //   new THREE.MeshBasicMaterial({ color: 0x222222, wireframe: false })
  // )
  // floor.rotation.x = -Math.PI / 2
  // floor.position.y = geometry.boundingBox.min.y - geometry.boundingSphere.radius / 2
  scene.add(mesh, frontLight, backLight)
  const grid = new THREE.GridHelper(10000, 1000)
  grid.position.z = -geometry.boundingSphere.radius * 1.7
  scene.add(grid)
  animate()
})

function animate () {
  window.requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
