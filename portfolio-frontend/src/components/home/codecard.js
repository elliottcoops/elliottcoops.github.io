import './codecard.css'

export function CodeCard() {
  return (
    <div className="position-relative w-100" style={{ maxWidth: '400px' }}>
      {/* Background gradient */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100 rounded-3"
        style={{
          background: 'linear-gradient(135deg, rgba(13,110,253,0.2), rgba(13,110,253,0.05))',
          transform: 'rotate(0.05deg)',
        }}
      ></div>

      {/* Card content with jump effect */}
      <div className="position-relative bg-dark text-light border border-secondary p-4 rounded-3 shadow font-monospace code-card">
        {/* Top bar */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex gap-2">
            <div className="rounded-circle bg-danger" style={{ width: '12px', height: '12px' }}></div>
            <div className="rounded-circle bg-warning" style={{ width: '12px', height: '12px' }}></div>
            <div className="rounded-circle bg-success" style={{ width: '12px', height: '12px' }}></div>
          </div>
          <div className="small text-secondary">developer.py</div>
        </div>

        {/* Python code content */}
        <div>
          <div className="text-secondary"># Software Engineer</div>
          <div>
            <span className="text-info">developer</span> <span className="text-light">=</span> <span className="text-warning">{'{'}</span>
          </div>
          <div className="ps-3">
            <span className="text-purple-400">"name"</span>: <span className="text-success">"Elliott Cooper"</span>,
          </div>
          <div className="ps-3">
            <span className="text-purple-400">"skills"</span>: <span className="text-warning">[</span>"Python", "C", "Java"<span className="text-warning">]</span>,
          </div>
          <div className="ps-3">
            <span className="text-purple-400">"focuses"</span>: <span className="text-warning">[</span>"ML", "DevOps"<span className="text-warning">]</span>,
          </div>
          <div className="ps-3">
            <span className="text-purple-400">"learning"</span>: "Always"
          </div>
          <div><span className="text-warning">{'}'}</span></div>
        </div>
      </div>
    </div>
  );
}
