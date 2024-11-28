import { useState } from "react";

export const NormalForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({
    username: false,
    password: false,
    confirmPassword: false,
  });

  const validateField = (name: string, value: string) => {
    let error = "";
    if (!value) {
      error = `Please input your ${name}!`;
    }
    if (name === "confirmPassword" && value !== formData.password) {
      error = "The passwords do not match!";
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {
      username: validateField("username", formData.username),
      password: validateField("password", formData.password),
      confirmPassword: validateField(
        "confirmPassword",
        formData.confirmPassword
      ),
    };
    setErrors(newErrors);

    // Mark all fields as touched
    setTouched({
      username: true,
      password: true,
      confirmPassword: true,
    });

    // Check if form is valid
    if (!Object.values(newErrors).some(Boolean)) {
      console.log("Success:", formData);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div
        style={{
          width: 600,
          padding: "24px",
          border: "1px solid #d9d9d9",
          borderRadius: "8px",
          backgroundColor: "white",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Normal Form Demo</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label
                style={{
                  width: "33%",
                  textAlign: "right",
                  paddingRight: "12px",
                }}
              >
                Username:
              </label>
              <div style={{ width: "67%" }}>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    width: "100%",
                    padding: "4px 11px",
                    border: "1px solid #d9d9d9",
                    borderRadius: "6px",
                  }}
                />
                {touched.username && errors.username && (
                  <div style={{ color: "red", fontSize: "14px" }}>
                    {errors.username}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label
                style={{
                  width: "33%",
                  textAlign: "right",
                  paddingRight: "12px",
                }}
              >
                Password:
              </label>
              <div style={{ width: "67%" }}>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    width: "100%",
                    padding: "4px 11px",
                    border: "1px solid #d9d9d9",
                    borderRadius: "6px",
                  }}
                />
                {touched.password && errors.password && (
                  <div style={{ color: "red", fontSize: "14px" }}>
                    {errors.password}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label
                style={{
                  width: "33%",
                  textAlign: "right",
                  paddingRight: "12px",
                }}
              >
                Confirm Password:
              </label>
              <div style={{ width: "67%" }}>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    width: "100%",
                    padding: "4px 11px",
                    border: "1px solid #d9d9d9",
                    borderRadius: "6px",
                  }}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <div style={{ color: "red", fontSize: "14px" }}>
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={{ marginLeft: "33%" }}>
            <button
              type="submit"
              style={{
                backgroundColor: "#1677ff",
                color: "white",
                border: "none",
                padding: "4px 15px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
