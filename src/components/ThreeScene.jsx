import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeScene() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const w = mount.clientWidth
    const h = mount.clientHeight

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100)
    camera.position.set(0, 0, 7)

    // Very subtle lighting — not colorful, just white
    scene.add(new THREE.AmbientLight(0xffffff, 0.3))
    const key = new THREE.DirectionalLight(0xffffff, 0.6)
    key.position.set(4, 4, 6)
    scene.add(key)
    const fill = new THREE.DirectionalLight(0xffffff, 0.15)
    fill.position.set(-4, -2, 2)
    scene.add(fill)

    // Single elegant sphere — Apple product-like
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.8, 128, 128),
      new THREE.MeshStandardMaterial({
        color: 0x0d0d0d,
        roughness: 0.05,
        metalness: 1.0,
        envMapIntensity: 1,
      })
    )
    scene.add(sphere)

    // Thin wireframe torus — very subtle
    const torusGeo = new THREE.TorusGeometry(2.6, 0.008, 32, 200)
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x333333,
      transparent: true,
      opacity: 0.4,
    })
    const torus = new THREE.Mesh(torusGeo, torusMat)
    torus.rotation.x = Math.PI / 2.5
    scene.add(torus)

    // Second orbital ring — slightly inclined
    const torus2 = new THREE.Mesh(
      new THREE.TorusGeometry(3.0, 0.005, 16, 200),
      new THREE.MeshBasicMaterial({ color: 0x222222, transparent: true, opacity: 0.25 })
    )
    torus2.rotation.x = Math.PI / 1.8
    torus2.rotation.z = 0.4
    scene.add(torus2)

    // Mouse tracking
    const mouse = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 1.4
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 1.4
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    let animId
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Very gentle, slow rotation — Apple-like
      target.x += (mouse.y * 0.12 - target.x) * 0.04
      target.y += (mouse.x * 0.12 - target.y) * 0.04

      sphere.rotation.y = t * 0.05 + target.y
      sphere.rotation.x = target.x * 0.5

      torus.rotation.z = t * 0.04
      torus2.rotation.y = t * 0.03

      // Subtle breathing
      const s = 1 + Math.sin(t * 0.4) * 0.008
      sphere.scale.set(s, s, s)

      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const nw = mount.clientWidth
      const nh = mount.clientHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
}
