import { useNavigate } from "react-router-dom";

const Setting = () => {
   const navigate = useNavigate();

  return (
    <div>
      <button className="button-block" onClick={() => navigate(-1)}>Go Back</button>
      <button className="button-block" onClick={() => navigate("verify-user")}>Verify user</button>
      <div className="form-container">
        <form className="inner-container">
          <h2 className="form-title">Change Password</h2>
          <div className="form-group">
            <label>Old password</label>
            <input
              className="form-control"
              type="password"
              name="oldPassword"
              placeholder="***********"
            />
          </div>

          <div className="form-group">
            <label>New password</label>
            <input
              className="form-control"
              type="password"
              name="newPassword"
              placeholder="***********"
            />
          </div>

          <div className="form-group">
            <input className="button" type="submit" value="Change" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Setting;
