import * as THREE from '/build/three.module.js'
import { OrbitControls } from '/jsm/controls/OrbitControls.js'
import { TWEEN } from '/jsm/libs/tween.module.min.js'
//import {GUI} from '/jsm/libs/dat.gui.module.js'
//console.log(GUI)
/*const panel = new GUI({width: 250})
 const point1 = panel.addFolder('point 1')*/
// const point2 = panel.addFolder('point 2')
// const point3 = panel.addFolder('point 3')
// const point4 = panel.addFolder('point 4')
// const point5 = panel.addFolder('point 5')

// const settings = {
//   x: 0,
//   y: 0,
//   z: 0,
//   'rotation x': 0,
//   'rotation y': 0,
//   'rotation z': 0,
//   'intensidad ambiental': 0,
//   'intensidad directional': 0,
// }
/*const settings ={ 
  x:1, 
  y:1, 
  z:0.5
}
 point1.add(settings, 'x', -20, 20).onChange(function (value) {
   camera.quaternion.x = value
 })
 point1.add(settings, 'y', -20, 20).onChange(function (value) {
  camera.quaternion.y = value
 })
 point1.add(settings, 'z', -20, 20).onChange(function (value) {
  camera.quaternion.z = value
 })*/
// point2.add(settings, 'x', -100, 100).onChange(function (value) {
//   points[1].position.x = value
// })
// point2.add(settings, 'y', -100, 100).onChange(function (value) {
//   points[1].position.y = value
// })
// point2.add(settings, 'z', -100, 100).onChange(function (value) {
//   points[1].position.z = value
// })
// point3.add(settings, 'x', -100, 100).onChange(function (value) {
//   points[2].position.x = value
// })
// point3.add(settings, 'y', -100, 100).onChange(function (value) {
//   points[2].position.y = value
// })
// point3.add(settings, 'z', -100, 100).onChange(function (value) {
//   points[2].position.z = value
// })
// point4.add(settings, 'x', -100, 100).onChange(function (value) {
//   points[3].position.x = value
// })
// point4.add(settings, 'y', -100, 100).onChange(function (value) {
//   points[3].position.y = value
// })
// point4.add(settings, 'z', -100, 100).onChange(function (value) {
//   points[3].position.z = value
// })
// point5.add(settings, 'x', -100, 100).onChange(function (value) {
//   points[4].position.x = value
// })
// point5.add(settings, 'y', -100, 100).onChange(function (value) {
//   points[4].position.y = value
// })
// point5.add(settings, 'z', -100, 100).onChange(function (value) {
//   points[4].position.z = value
// })

const scene = new THREE.Scene()
let box_canvas = document.getElementById('cont-canvas')
let clock, mixer
let laptopScene
let buliano
let abrir, cerrar, antenas, tablet, cerrar_antenas
let laptop_open,
	laptop_close,
	monitor_180turn_a,
	monitor_180turn_b,
	lock_90degrees_a,
	lock_90degrees_b,
	lock_close,
	lock_fullclose,
	lock_open,
	laptop_90degrees_a,
	laptop_90degrees_b
let abrirpeso, cerrarpeso, acciones, animations
let setear_peso_abrir
let escala_tiempo
//let tween
const container = document.getElementById('container')
let lookDirection = new THREE.Vector3(0, 0, 0)

let canvas = document.getElementById('artifactcanvas')
let btn_screen = document.getElementById('btn_screen')
let img_screen = document.getElementById('btn_screen_imagen')
let mobileD = window.matchMedia('(max-width: 700px)')

//botones en letiables
let btnabrir = document.getElementById('boton_abrir')
let btncerrar = document.getElementById('boton_cerrar')
let btntablet = document.getElementById('boton_tablet')

let btnspecs = document.getElementById('boton_specifications')
let botonar = document.getElementById('btn_ar')
// boton aumented reality
let modal = document.querySelector('.modal')
let card = document.querySelector('.card')
let obj_measure, load_measure
/*
 * Loaders
 */
const loadingBarElement = document.querySelector('.loading-bar')

let sceneReady = false
const loadingManager = new THREE.LoadingManager(
	// Loaded
	() => {
		// Wait a little
		window.setTimeout(() => {
			// Animate overlay
			// gsap.to(overlayMaterial.uniforms.uAlpha, {
			//   duration: 3,
			//   value: 0,
			//   delay: 1,
			// })
			// Update loadingBarElement
			// loadingBarElement.classList.add('ended')
			// loadingBarElement.style.transform = ''
		}, 500)

		window.setTimeout(() => {
			sceneReady = true
		}, 2000)
	}
)
buliano = false
/**
 * PERSPECTIVE CAMERA
 */
const camera = new THREE.PerspectiveCamera(
	60,
	box_canvas.clientWidth / box_canvas.clientHeight,
	3,
	1000
)
//camera.lookAt(0,0,0)
/**
 * Points of interest
 */
const raycaster = new THREE.Raycaster()
const points = [
	{
		position: new THREE.Vector3(1.4, 3, -2.8),
		element: document.querySelector('.point-0'),
	},
	{
		position: new THREE.Vector3(-4, -8, 8),
		element: document.querySelector('.point-1'),
	},
	{
		position: new THREE.Vector3(-8, 11, -10),
		element: document.querySelector('.point-2'),
	},
	{
		position: new THREE.Vector3(5.4, -7, -9.4),
		element: document.querySelector('.point-3'),
	},
	{
		position: new THREE.Vector3(12.5, -2, 1.7),
		element: document.querySelector('.point-4'),
	},
]

/**
 * Sizes
 */
const sizes = {
	width: box_canvas.offsetWidth,
	height: box_canvas.offsetHeight,
}

const renderer = new THREE.WebGLRenderer({
	canvas: artifactcanvas,
	alpha: true,
	antialias: true,
})

renderer.setPixelRatio(window.devicePixelRatio)

renderer.setSize(box_canvas.offsetWidth, box_canvas.offsetHeight)

camera.aspect = box_canvas.offsetWidth / box_canvas.offsetHeight
camera.updateProjectionMatrix()
//renderer.toneMapping = THREE.ACESFilmicToneMapping
//renderer.toneMappingExposure = 0.4
//renderer.outputEncoding = THREE.sRGBEncoding

clock = new THREE.Clock()

//hdri
/*let pmremGenerator = new THREE.PMREMGenerator(renderer)
pmremGenerator.compileEquirectangularShader()*/
//hdri parte 2
/*let efecto = new RGBELoader()
efecto.setDataType(THREE.UnsignedByteType)
efecto.load(
  'imagenes/hdri/christmas_photo_studio_04_1k_LIGHT.hdr',
  function (texture) {
    let envMap = pmremGenerator.fromEquirectangular(texture).texture
    scene.environment = envMap
    texture.dispose()
    pmremGenerator.dispose()
  }
)*/
//fin del hdri
//const roughnessMipmapper = new RoughnessMipmapper(renderer)
//const objeto = new GLTFLoader(loadingManager)

const objeto_v = new THREE.ObjectLoader(loadingManager)
objeto_v.load('objetos/scene.json', function (gltf) {
	laptopScene = gltf
	laptopScene.scale.set(5, 5, 5)
	laptopScene.position.set(0, -8, 1)
	laptopScene.rotation.set(0, 180.2, 0)
	scene.add(laptopScene)
	animations = laptopScene.children[0].animations
	//console.log(animations)
	mixer = new THREE.AnimationMixer(laptopScene)
	tablet = mixer.clipAction(animations[0])
	monitor_180turn_a = mixer.clipAction(animations[0])
	monitor_180turn_b = mixer.clipAction(animations[1])
	lock_90degrees_a = mixer.clipAction(animations[2])
	lock_90degrees_b = mixer.clipAction(animations[3])
	lock_close = mixer.clipAction(animations[4])
	lock_fullclose = mixer.clipAction(animations[5])
	lock_open = mixer.clipAction(animations[6])
	laptop_90degrees_a = mixer.clipAction(animations[7])
	laptop_90degrees_b = mixer.clipAction(animations[8])
	laptop_open = mixer.clipAction(animations[9])
	laptop_close = mixer.clipAction(animations[10])
})

camera.lookAt(0, -8, 1)
//laptop_open.play()
/*objeto.load('objetos/OneLaptopPerChild_Laptop.glb', function (gltf) {
  laptopScene = gltf.scene
  laptopScene.position.set(0, -8, 1)
  laptopScene.scale.set(100, 100, 100)
  laptopScene.rotation.set(0, 180.2, 0)
  scene.add(gltf.scene)*/
/*laptopScene.traverse(function (child) {
    if (child.isMesh) {
      roughnessMipmapper.generateMipmaps(child.material)
    }
  })*/
/*const animations = gltf.animations 
  console.log(animations)
  mixer = new THREE.AnimationMixer(laptopScene)

  tablet = mixer.clipAction(animations[0])
  monitor_180turn_a = mixer.clipAction(animations[0])
  monitor_180turn_b = mixer.clipAction(animations[1])
  lock_90degrees_a = mixer.clipAction(animations[2])
  lock_90degrees_b = mixer.clipAction(animations[3])
  lock_close = mixer.clipAction(animations[4])
  lock_fullclose = mixer.clipAction(animations[5])
  lock_open = mixer.clipAction(animations[6])
  laptop_90degrees_a = mixer.clipAction(animations[7])
  laptop_90degrees_b = mixer.clipAction(animations[8])
  laptop_open = mixer.clipAction(animations[9])
  laptop_close = mixer.clipAction(animations[10])
})*/

//funciones de animaciones
//abrir laptop
function abrirpantalla() {
	mixer.stopAllAction()
	//iniciando la accion de abrir antenas
	lock_open.weight = 1
	lock_open.fadeIn(0.01)
	lock_open.play()
	lock_fullclose.weight = 0 // se puso fullcose 0 para que pudiera realizar la accion open-close
	//iniciando la accion de abrir laptop
	laptop_open.weight = 1
	laptop_open.fadeIn(0.01)
	laptop_open.play()
	laptop_open.clampWhenFinished = true
	laptop_open.loop = THREE.LoopOnce
	lock_open.clampWhenFinished = true
	lock_open.loop = THREE.LoopOnce
	btnabrir.disabled = true
	btnabrir.style.opacity = 0.5
	btntablet.disabled = false
	btntablet.style.opacity = 1
	btnspecs.disabled = false
	btnspecs.style.opacity = 1
	btncerrar.disabled = false
	btncerrar.style.opacity = 1
}

//funcion cerrar laptop
function cerrarpantalla() {
	if (lock_fullclose.weight == 0) {
		//cerrar antenas
		mixer.stopAllAction()
		lock_open.setEffectiveWeight(0)

		lock_open.weight = 0
		lock_open.fadeOut(0.1)

		lock_close.weight = 1
		lock_close.fadeIn(0.01)
		lock_close.loop = THREE.LoopOnce
		lock_close.clampWhenFinished = true
		lock_close.play()
		//correciones
		laptop_open.fadeOut(0.9)
		laptop_close.setEffectiveWeight(1)
		// laptop_close.fadeIn(0.01)
		laptop_close.play()
		laptop_close.clampWhenFinished = true
		laptop_close.loop = THREE.LoopOnce
		btnabrir.disabled = false
		btnabrir.style.opacity = 1
		btnspecs.disabled = true
		btnspecs.style.opacity = 0.5
		btntablet.disabled = true
		btntablet.style.opacity = 0.5
		btncerrar.disabled = true
		btncerrar.style.opacity = 0.5
	}
}

function modetablet() {
	if (lock_open.weight == 1 && laptop_open.weight == 1) {
		console.log('1')
		mixer.stopAllAction()

		lock_open.weight = 0
		//lock_open.fadeOut(0.1);
		lock_fullclose.weight = 1
		lock_fullclose.fadeIn(0.01)
		lock_fullclose.play()
		lock_fullclose.clampWhenFinished = true
		lock_fullclose.loop = THREE.LoopOnce
		monitor_180turn_a.weight = 1
		monitor_180turn_a.fadeIn(0.01)
		monitor_180turn_a.play()
		monitor_180turn_a.clampWhenFinished = true
		monitor_180turn_a.loop = THREE.LoopOnce
		laptop_open.setEffectiveWeight(0)
		laptop_close.weight = 1
		laptop_close.fadeIn(0.01)
		laptop_close.loop = THREE.LoopOnce
		laptop_close.clampWhenFinished = true
		laptop_close.play()

		//measure_o.visible=false;//ocultar measure
		btncerrar.disabled = true
		btncerrar.style.opacity = 0.5
		btnspecs.disabled = true
		btnspecs.style.opacity = 0.5
	} else if (monitor_180turn_a.weight == 1 && laptop_close.weight == 1) {
		console.log('2')
		//laptop_open.reset(); //con este se queda en loop

		laptop_close.weight = 0
		laptop_close.fadeOut(0.01)

		laptop_open.weight = 1
		lock_fullclose.weight = 0
		laptop_open.fadeIn(0.01)
		laptop_open.play()

		laptop_open.loop = THREE.LoopOnce

		laptop_open.clampWhenFinished = true
		setTimeout(() => {
			lock_open.setEffectiveWeight(1)

			lock_open.fadeIn(0.01)
			lock_open.play()
			lock_open.clampWhenFinished = true
			lock_open.loop = THREE.LoopOnce
		}, 1000)

		// monitor_180turn_b.reset(); //con este se queda en loop
		setTimeout(() => {
			monitor_180turn_a.weight = 0
			monitor_180turn_a.fadeOut(0.1) //con 0.01 el cambio adquiere lentitud
			monitor_180turn_b.weight = 1
			monitor_180turn_b.fadeIn(0.01)
			monitor_180turn_b.play()
			monitor_180turn_b.loop = THREE.LoopOnce
			monitor_180turn_b.clampWhenFinished = true
		}, 3000)

		btnspecs.disabled = false
		btncerrar.disabled = false
		btncerrar.style.opacity = 1
		btnspecs.style.opacity = 1
	}
}

//evento AR
let isMobile = {
	Android: function () {
		/*window.location="https://titanium-ninth-oregano.glitch.me";*/
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i)
	},
	iOS: function () {
		/*window.location="https://titanium-ninth-oregano.glitch.me";*/
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i)
	},
	Windows: function () {
		return (
			navigator.userAgent.match(/IEMobile/i) ||
			navigator.userAgent.match(/WPDesktop/i)
		)
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows()
		)
	},
}
let mostrar_qr = false

function ar() {
	/*----------*/

	if (mostrar_qr == false) {
		modal.style.visibility = 'visible'
		card.classList.toggle('grow')
		card.classList.remove('shrink')

		mostrar_qr = true
	} else {
		card.classList.toggle('grow')
		card.classList.toggle('shrink')

		mostrar_qr = false
		setTimeout(() => {
			modal.style.visibility = 'hidden'
		}, 1000)
	}
	/*else if( isMobile.iOS() ) window.location="https://wireframereality.com/laptop/qr/"; 
    else if( isMobile.Android() ) window.location="https://titanium-ninth-oregano.glitch.me";  
  else{ 
    mostrar_qr=false; 
    modal.style.visibility='hidden';
  }*/

	/*----mostrar_qr=false; 
    modal.style.visibility='hidden'; ----*/
	/* if(isMobile.Android==true || isMobile.iOS==true){ 
    mostrar_qr=false; 
    modal.style.visibility='hidden'; 
    
  }*/
}
function qr() {
	window.location = 'https://wireframereality.com/laptop/qr/'
}
card.addEventListener('click', qr)
//******evento measure******
load_measure = new THREE.ObjectLoader()
load_measure.load('/objetos/measure.json', function (obj) {
	obj_measure = obj
	obj_measure.scale.set(100, 100, 100)
	obj_measure.position.set(0, -28.5, 1)
	obj_measure.rotation.set(0, 180.2, 0)
	scene.add(obj_measure)
	obj_measure.visible = false
})

/*obj_measure = await load_measure.loadAsync('/objetos/measure.json');
   obj_measure.scale.set(100, 100, 100)
   obj_measure.position.set(0, -28.5, 1)
   obj_measure.rotation.copy(objeto.rotation)
   scene.add(obj_measure) */
//obj_measure.visible= false
function measure() {
	if (mostrar_especificaciones === false) {
		obj_measure.visible = true
	} else {
		obj_measure.visible = false
	}
}
/*const load_measure = new THREE.ObjectLoader();  
const obj_measure = await load_measure.loadAsync('/objetos/measure.json');
    obj_measure.scale.set(100, 100, 100)
    obj_measure.position.set(0, -28.5, 1)
    obj_measure.rotation.copy(objeto.rotation)
    scene.add(obj_measure)*/

// ******Variables y eventos de Tween camara******
let point_0 = document.querySelector('.point-0')
let point_1 = document.querySelector('.point-1')
let point_2 = document.querySelector('.point-2')
let point_3 = document.querySelector('.point-3')
let point_4 = document.querySelector('.point-4')
point_0.addEventListener('click', pn0)
point_1.addEventListener('click', pn1)
point_2.addEventListener('click', pn2)
point_3.addEventListener('click', pn3)
point_4.addEventListener('click', pn4)
let pointChecked = false
let point0Checked = false
let point1Checked = false
let point2Checked = false
let point3Checked = false
let point4Checked = false
//mostrar los 5 botones de las specs
let mostrar_especificaciones = false
const labelpoint = document.querySelectorAll('.point .label')
const point = document.querySelectorAll('.point')
const visible = document.querySelectorAll('.visible')
const linea = `<svg id="svg1">
	<line
		id="line1"
		x1='2.5'
		y1="2.5"

		y2="2.5"
		fill="none"
		stroke="#9a999d"
		stroke-linecap="round"
		stroke-miterlimit="10"
		stroke-width="5"
	>
		<animate
			attributeName="x2"
			attributeType="XML"
			from="0"
			to="240"
			dur="2s"
			repeatCount="once"
			fill='freeze'
		/>
	</line>
</svg>`
let numberMemory = 100
//*******orbit control******
const controls = new OrbitControls(camera, canvas)
controls.update()
//controls.enableDamping = true

function moveAndLookAt(camera, dstpos, dstlookat, options, number) {
	console.log(number)
	options || (options = { duration: 300 })
	// if (numberMemory === 100) {
	// 	numberMemory = number
	// }

	if (pointChecked) {
		const svg = document.querySelector('.point svg')
		svg.remove()
		const text = document.querySelectorAll('.text')
		text[0].style.opacity = '0'
		text[1].style.opacity = '0'
		text[2].style.opacity = '0'
		text[3].style.opacity = '0'
		text[4].style.opacity = '0'
		controls.enabled = true
	} else {
		const svg = document.querySelector('.point svg')
		if (svg) {
			svg.remove()
		}
		const text = document.querySelectorAll('.text')
		controls.enabled = false
		text[0].style.opacity = '0'
		text[1].style.opacity = '0'
		text[2].style.opacity = '0'
		text[3].style.opacity = '0'
		text[4].style.opacity = '0'
	}

	var origpos = new THREE.Vector3().copy(camera.position) // original position
	var origrot = new THREE.Euler().copy(camera.rotation) // original rotation

	camera.position.set(dstpos.x, dstpos.y, dstpos.z)
	camera.lookAt(dstlookat)
	var dstrot = new THREE.Euler().copy(camera.rotation)

	// reset original position and rotation
	camera.position.set(origpos.x, origpos.y, origpos.z)
	camera.rotation.set(origrot.x, origrot.y, origrot.z)

	//
	// Tweening
	//

	// position
	new TWEEN.Tween(camera.position)
		.to(
			{
				x: dstpos.x,
				y: dstpos.y,
				z: dstpos.z,
			},
			options.duration
		)
		.onComplete(() => {
			if (!pointChecked) {
				pointChecked = true
				point[number].innerHTML += linea
				setTimeout(() => {
					const text = document.querySelectorAll('.text')
					text[number].style.opacity = '1'
				}, 2000)
			} else {
				pointChecked = false
			}
			controls.target = new THREE.Vector3(
				points[0].position.x,
				points[0].position.y,
				points[0].position.z
			)
			controls.update()
		})
		.start()

	// rotation (using slerp)
	;(function () {
		var qa = (qa = new THREE.Quaternion().copy(camera.quaternion)) // src quaternion
		var qb = new THREE.Quaternion().setFromEuler(dstrot) // dst quaternion
		var qm = new THREE.Quaternion()
		camera.quaternion.copy(qm)

		var o = { t: 0 }
		new TWEEN.Tween(o)
			.to({ t: 1 }, options.duration)
			.onUpdate(function () {
				qm.slerpQuaternions(qa, qb, o.t)
				camera.quaternion.set(qm.x, qm.y, qm.z, qm.w)
			})
			.start()
	}.call(this))
}

///********animaciones TWEEN*******
function pn0() {
	if (pointChecked === false) {
		moveAndLookAt(
			camera,
			new THREE.Vector3(points[0].position.x, points[0].position.y, 18),
			new THREE.Vector3(
				points[0].position.x + 10,
				points[0].position.y,
				points[0].position.z
			),
			{ duration: 1500 },
			0
		)

		// 		TWEEN.remove(m)
	} else {
		moveAndLookAt(
			camera,
			new THREE.Vector3(-15.75, 3.44, 34.4),
			new THREE.Vector3(
				points[0].position.x,
				points[0].position.y,
				points[0].position.z
			),
			{ duration: 1500 },
			0
		)
	}
}
function pn1() {
	if (pointChecked === false) {
		moveAndLookAt(
			camera,
			new THREE.Vector3(points[1].position.x, 8, 18),
			new THREE.Vector3(
				points[1].position.x + 10,
				points[1].position.y,
				points[1].position.z
			),
			{ duration: 1500 },
			1
		)
	} else {
		moveAndLookAt(
			camera,
			new THREE.Vector3(-15.75, 3.44, 34.4),
			new THREE.Vector3(
				points[0].position.x,
				points[0].position.y,
				points[0].position.z
			),
			{ duration: 1500 },
			1
		)
	}
}
function pn2() {
	if (pointChecked === false) {
		moveAndLookAt(
			camera,
			new THREE.Vector3(points[2].position.x, points[2].position.y, 20),
			new THREE.Vector3(
				points[2].position.x + 10,
				points[2].position.y,
				points[2].position.z
			),
			{ duration: 1500 },
			2
		)
	} else {
		moveAndLookAt(
			camera,
			new THREE.Vector3(-15.75, 3.44, 34.4),
			new THREE.Vector3(
				points[0].position.x,
				points[0].position.y,
				points[0].position.z
			),
			{ duration: 1500 },
			2
		)
	}
}
function pn3() {
	if (pointChecked === false) {
		moveAndLookAt(
			camera,
			new THREE.Vector3(points[3].position.x - 10, 2, -30),
			new THREE.Vector3(
				points[1].position.x + 5,
				points[1].position.y + 2,
				points[1].position.z
			),
			{ duration: 1500 },
			3
		)
	} else {
		moveAndLookAt(
			camera,
			new THREE.Vector3(-15.75, 3.44, 34.4),
			new THREE.Vector3(
				points[0].position.x,
				points[0].position.y,
				points[0].position.z
			),
			{ duration: 1500 },
			3
		)
	}
}
function pn4() {
	if (pointChecked === false) {
		moveAndLookAt(
			camera,
			new THREE.Vector3(points[4].position.x + 20, points[4].position.y, -10),
			new THREE.Vector3(
				points[4].position.x - 15,
				points[4].position.y,
				points[4].position.z
			),
			{ duration: 1500 },
			4
		)
	} else {
		moveAndLookAt(
			camera,
			new THREE.Vector3(-15.75, 3.44, 34.4),
			new THREE.Vector3(
				points[0].position.x,
				points[0].position.y,
				points[0].position.z
			),
			{ duration: 1500 },
			4
		)
	}
}
//*desahabilitar botones*
btncerrar.disabled = true
btntablet.disabled = true
btnspecs.disabled = true

if (btncerrar.disabled == true) {
	btncerrar.style.opacity = 0.5
}
if (btntablet.disabled == true) {
	btntablet.style.opacity = 0.5
}
if (btnspecs.disabled == true) {
	btnspecs.style.opacity = 0.5
}

//eventos click de animaciones
btnabrir.addEventListener('click', abrirpantalla)
btncerrar.addEventListener('click', cerrarpantalla)
btntablet.addEventListener('click', modetablet)
btnspecs.addEventListener('click', mostrar_opciones_especs)
botonar.addEventListener('click', ar)
//responsive
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
	camera.aspect = box_canvas.offsetWidth / box_canvas.offsetHeight
	camera.updateProjectionMatrix()
	renderer.setSize(box_canvas.offsetWidth, box_canvas.offsetHeight)
	if (mobileD.matches) {
		console.log('mobile')
		// renderer.setSize(window.innerWidth, (window.innerHeight * 40) / 100)
	} else {
		console.log('desktop')
		// renderer.setSize((window.innerWidth * 60) / 100, window.innerHeight)
	}
}

camera.position.z = 38

//****ORBIT CONTROLS LISTENERS ******/
/*controls.addEventListener('start',()=>{    
  var distancia = camera.position.distanceTo(laptopScene.position);  
  console.log("start: "+distancia) 
}) 
controls.addEventListener('change',()=>{    
  var distancia = camera.position.distanceTo(laptopScene.position);  
  console.log("change: "+distancia) 

})*/
controls.addEventListener('end', () => {
	var distancia = camera.position.distanceTo(laptopScene.position)
	console.log('end: ' + distancia)
})

// *****mostrar especs*****
function mostrar_opciones_especs() {
	if (mostrar_especificaciones === false) {
		measure()
		labelpoint.forEach((element) => {
			element.style.opacity = '0.3'
		})
		btntablet.disabled = true
		btntablet.style.opacity = 0.5
		btncerrar.disabled = true
		btncerrar.style.opacity = 0.5
		mostrar_especificaciones = true
	} else {
		obj_measure.visible = false
		mostrar_especificaciones = false
		btntablet.disabled = false
		btntablet.style.opacity = 1
		btncerrar.disabled = false
		btncerrar.style.opacity = 1
	}
}

const animate = function () {
	//camera.lookAt(0, -8, 1)
	camera.aspect = box_canvas.offsetWidth / box_canvas.offsetHeight
	camera.updateProjectionMatrix()
	camera.updateMatrixWorld()
	// var vector = camera.position.clone()
	// camera.localToWorld(vector)
	// camera.worldToLocal(vector)
	// console.log(vector)
	renderer.setSize(box_canvas.offsetWidth, box_canvas.offsetHeight)
	if (sceneReady && mostrar_especificaciones) {
		point.forEach((element) => {
			element.style.opacity = '1'
		})
		// Go through each point
		for (const point of points) {
			// Get 2D screen position

			const screenPosition = point.position.clone()
			screenPosition.project(camera)

			// Set the raycaster
			raycaster.setFromCamera(screenPosition, camera)
			const intersects = raycaster.intersectObjects(scene.children, true)

			// No intersect found
			if (intersects.length === 0) {
				// Show
				point.element.classList.add('visible')
			}

			// Intersect found
			else {
				// Get the distance of the intersection and the distance of the point
				const intersectionDistance = intersects[0].distance
				const pointDistance = point.position.distanceTo(camera.position)

				// Intersection is close than the point
				if (intersectionDistance < pointDistance) {
					// Hide

					point.element.classList.remove('visible')
				}
				// Intersection is further than the point
				else {
					// Show
					point.element.classList.add('visible')
				}
			}

			const translateX = screenPosition.x * box_canvas.offsetWidth * 0.5
			const translateY = -screenPosition.y * box_canvas.offsetHeight * 0.5
			point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
		}
	} else {
		point.forEach((element) => {
			element.classList.remove('visible')
			element.style.opacity = '0'
		})
	}
	let mixerUpdateDelta = clock.getDelta()
	// controls.update()
	TWEEN.update()
	requestAnimationFrame(animate)
	mixer.update(mixerUpdateDelta)
	renderer.render(scene, camera)
}

animate()
