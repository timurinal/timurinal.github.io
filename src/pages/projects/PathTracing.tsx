function PathTracing() {
  return (
    <>
      <div className="project-page">
        <h1>Path Tracing</h1>
        <h4 className="completed">Completed</h4>
        <h5>27-04-2024</h5>

        <p>
          Recently, I've been learning shaders in Unity and I made a{' '}
          <a href="/atmosphere">realtime atmospheric scattering simulation</a>{' '}
          and that used ray marching to simulate all the little light
          interactions. With this new knowledge of shaders and ray marching, I
          wanted to attempt to make my own path tracer in Unity! I've actually
          made a ray tracer before, following{' '}
          <a
            href="https://www.gamedeveloper.com/programming/gpu-ray-tracing-in-unity-part-1"
            target="_blank"
            rel="noreferrer"
          >
            this
          </a>{' '}
          guide. It was great for learning about ray tracers, and it was very
          fast, but it didn't produce the best results. Shadows were very harsh,
          reflections looked 'off', and biggest of all, there wasn't support for
          triangles. This new path tracer I made is much better and has many new
          features like:
        </p>
        <ul>
          <li>Multiple lights</li>
          <li>
            Soft shadows (this was actually a side effect of how the light is
            accumulated)
          </li>
          <li>Support for custom meshes</li>
          <li>Skybox to add detail to the environment</li>
          <li>Specular and diffuse reflections</li>
          <li>Emissive materials</li>
        </ul>
        <p>
          I've still got loads to add like, normal mapping, and texture mapping,
          but it is already capable of rendering realistic scenes with only a
          short wait for the denoiser.
          <br />
          The denoiser that the path tracer uses is a custom denoiser that
          averages the frame out with the previous frame to help reduce noise
          where rays didn't hit a light at all so no light could be added to
          that pixel. I am working on a better denoiser that blurs the image and
          does some edge detection to work out where shapes are to re-sharpen
          the blurred frame but that is still very incomplete. I also need to
          optimise the triangle intersection testing as even a few triangles is
          enough to completely kill your framerate.
        </p>
        <p>
          It isn't the most performant by any means but is able to quickly
          render (simple) scenes. During testing, I was able to render about 15
          FPS (frames per second) with 6 spheres and no triangles, and I was
          able to get a relatively denoised picture after about 15 minutes, but
          the initial bulk of the noise disappears after about a minute. With a
          slightly more complex scene (about 6 quads and 4 spheres), I was able
          to get a denoised image after about 2 hours.
        </p>
        <p>
          The source code is available on my{' '}
          <a
            href="https://github.com/timurinal/Path-Tracing/"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>{' '}
          as a Unity project if you want to check it out, although the code is
          very messy, given that it was written in a compute shader and not in a
          fragment shader. My{' '}
          <a href="/projects/path-tracing-2">second attempt</a> at a path tracer
          is a massive improvement over this one, so be sure to check that out!
        </p>
      </div>
    </>
  );
}

export default PathTracing;
