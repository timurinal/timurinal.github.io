import './styles/Project.css';
import '../pages/projects/styles/ProjectPage.css';

export enum ProjectProgress {
  NotStarted = 'NotStarted',
  InProgress = 'InProgress',
  Complete = 'Complete',
}

interface Props {
  flipped: boolean;
  image: string;
  height: number;
  title: string;
  description: string;
  progress: ProjectProgress;
  link: string;
}

function Project(props: Props) {
  let progessText: string;
  let progressClass: string;
  switch (props.progress) {
    case ProjectProgress.NotStarted:
      progessText = 'Not Started';
      progressClass = 'not-started';
      break;
    case ProjectProgress.InProgress:
      progessText = 'In Progress';
      progressClass = 'in-progress';
      break;
    case ProjectProgress.Complete:
      progessText = 'Completed';
      progressClass = 'completed';
      break;
  }

  return (
    <>
      <div className="project">
        <div className="row align-items-center content">
          {/* Image Column */}
          <div
            className={`col-12 col-md-6 mb-3 mb-md-0 ${props.flipped ? 'order-md-2' : ''}`}
          >
            <img
              src={props.image}
              alt="Project"
              className="rounded mx-auto d-block img-fluid"
              style={{
                height: `${props.height}px`,
                width: '100%',
                objectFit: 'contain',
              }}
            />
          </div>

          {/* Text Column */}
          <div
            className={`col-12 col-md-6 ${props.flipped ? 'order-md-1' : ''}`}
          >
            <h3>{props.title}</h3>
            <h5 className={progressClass}>{progessText}</h5>
            <p>{props.description}</p>
            <a className="btn btn-primary fullwidth-button" href={props.link}>
              View Project
              <i className="bi bi-arrow-right ms-3" />
            </a>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
}

export default Project;
