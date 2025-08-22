import './welcome.css'

export function Welcome() {

    return (
        <div className="welcome-container">

            <div className="container"> 
                <h1 className="display-4" style={{ color: '#25a6aa' }}>
                    Hello, I'm Elliott
                </h1>

                <h2 className="display-6 fs-3 mt-2 mb-3">
                    Final Year MSci Computer Science Student
                </h2>

                <p style={{ marginTop: '2rem', lineHeight: '1.6' }}>
                    Skilled in machine learning and software engineering, with industry experience in API integration, computer vision, full-stack development and financial systems.
                </p>

                <div className="d-flex justify-content-left gap-5 mt-3">
                    <a href="https://github.com/elliottcoops" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-github" style={{ fontSize: '2rem', color: '#bebdbddc' }}></i>
                    </a>
                    <a href="https://linkedin.com/in/elliottcoops" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-linkedin" style={{ fontSize: '2rem', color: '#bebdbddc' }}></i>
                    </a>
                    <a href="mailto:elliottcoops@gmail.com">
                        <i className="bi bi-envelope-fill" style={{ fontSize: '2rem', color: '#bebdbddc' }}></i>
                    </a>
                </div>


            </div>

            <div className="container2"> 
                <img
                    src="/picture.jpg"
                    alt="Description"
                    className="rounded-circle"
                    style={{
                    width: '30%',          // responsive width
                    aspectRatio: '1 / 1',  // ensures height = width
                    objectFit: 'cover'
                    }}
                />
            </div>

     
        </div>
    );
}