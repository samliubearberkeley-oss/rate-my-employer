import './PixelPoster.css';

export default function PixelPoster() {
  return (
    <div className="pixel-poster">
      <div className="poster-container">
        {/* Header Section */}
        <div className="poster-header pixel-border">
          <div className="pixel-icon joystick">
            <div className="joystick-base"></div>
            <div className="joystick-stick"></div>
          </div>
          <h1 className="pixel-title">ART & GAME</h1>
          <h2 className="pixel-subtitle">EXHIBITION</h2>
          <div className="pixel-icon heart">
            <div className="heart-pixel"></div>
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="schedule-grid">
          {/* Day 1 */}
          <div className="schedule-block blue-block pixel-border">
            <div className="block-header">
              <div className="pixel-icon-small monitor">
                <div className="monitor-screen"></div>
              </div>
              <span className="day-label">DAY 01</span>
            </div>
            <div className="time-slot">10:00 AM</div>
            <div className="event-name">RETRO ARCADE</div>
            <div className="event-name">SHOWCASE</div>
          </div>

          {/* Day 2 */}
          <div className="schedule-block yellow-block pixel-border">
            <div className="block-header">
              <div className="pixel-icon-small note">
                <div className="note-head"></div>
                <div className="note-stem"></div>
              </div>
              <span className="day-label">DAY 02</span>
            </div>
            <div className="time-slot">02:00 PM</div>
            <div className="event-name">CHIPTUNE</div>
            <div className="event-name">CONCERT</div>
          </div>

          {/* Day 3 */}
          <div className="schedule-block white-block pixel-border">
            <div className="block-header">
              <div className="pixel-icon-small joystick-small">
                <div className="joy-base-small"></div>
              </div>
              <span className="day-label">DAY 03</span>
            </div>
            <div className="time-slot">11:00 AM</div>
            <div className="event-name">GAME JAM</div>
            <div className="event-name">FINALS</div>
          </div>

          {/* Day 4 */}
          <div className="schedule-block blue-block pixel-border">
            <div className="block-header">
              <div className="pixel-icon-small heart-small">
                <div className="heart-pixel-small"></div>
              </div>
              <span className="day-label">DAY 04</span>
            </div>
            <div className="time-slot">04:00 PM</div>
            <div className="event-name">PIXEL ART</div>
            <div className="event-name">WORKSHOP</div>
          </div>

          {/* Day 5 */}
          <div className="schedule-block yellow-block pixel-border">
            <div className="block-header">
              <div className="pixel-icon-small monitor">
                <div className="monitor-screen"></div>
              </div>
              <span className="day-label">DAY 05</span>
            </div>
            <div className="time-slot">06:00 PM</div>
            <div className="event-name">CLOSING</div>
            <div className="event-name">CEREMONY</div>
          </div>
        </div>

        {/* Info Section */}
        <div className="info-section pixel-border">
          <div className="info-row">
            <span className="info-label">LOCATION:</span>
            <span className="info-value">PIXEL ARENA</span>
          </div>
          <div className="pixel-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
          <div className="info-row">
            <span className="info-label">TICKETS:</span>
            <span className="info-value">WWW.8BIT.COM</span>
          </div>
        </div>

        {/* Footer */}
        <div className="poster-footer pixel-border">
          <div className="footer-icons">
            <div className="pixel-icon-tiny"></div>
            <div className="pixel-icon-tiny"></div>
            <div className="pixel-icon-tiny"></div>
          </div>
          <div className="footer-text">PRESS START TO JOIN</div>
          <div className="pixel-corner tl"></div>
          <div className="pixel-corner tr"></div>
          <div className="pixel-corner bl"></div>
          <div className="pixel-corner br"></div>
        </div>
      </div>
    </div>
  );
}

