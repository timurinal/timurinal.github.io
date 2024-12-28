import './styles/Projects.css';
import Project, { ProjectProgress } from '../components/Project';

function Projects() {
  return (
    <>
      <div className="projects">
        <h1>Projects</h1>

        <hr />
        <Project
          flipped={false}
          image="/images/projects/project-1.png"
          height={300}
          title="Path Tracing"
          description="I’ve been exploring shaders in Unity and created a realtime atmospheric scattering simulation, which inspired me to develop a more advanced path tracer. Building on my prior experience with ray tracing, this new project supports multiple lights, soft shadows, custom meshes, skyboxes, and both specular and diffuse reflections, alongside emissive materials. While it’s not the most optimised, it produces realistic scenes, leveraging a custom denoiser that averages frames to reduce noise effectively. Although it struggles with triangles and more complex scenes, it’s a significant improvement over my earlier work, and the source code is available on my GitHub for anyone interested."
          progress={ProjectProgress.Complete}
          link="/projects/path-tracing"
        />
        <Project
          flipped={true}
          image="/images/projects/project-2.png"
          height={300}
          title="Path Tracing 2"
          description="I've been attempting to improve my previous path tracer, by adding things like refractions, volumetric lighting, and more. I've massively improved the denoiser, by using a better temporal denoiser and by adding a bilateral filter to smooth out any remaining noise. I've also added support for creating simple 'animations', which integrates directly with Unity's Timeline system allowing for complex animations to be rendered into MP4 video files. I've also added support for cubes, which can be path traced much more efficiently than using triangles for a cube. There is still support for meshes, with better AABB testing for quickly culling meshes. The results are a massive improvement over my previous work, especially with support for HDRI skyboxes. The code is not yet available on GitHub, but I'll be posting it soon once I've finished cleaning it up and adding more features."
          progress={ProjectProgress.InProgress}
          link="/projects/path-tracing-2"
        />
      </div>
    </>
  );
}

export default Projects;
