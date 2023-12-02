import React from "react";
import { Card, Row, Col, Image, Button, Container } from "react-bootstrap";
import NavigationBar from "../Components/NavigationBar";
import { Cookies } from "react-cookie";
import defaultuser from "../Assets/defaultuser.jpg";
import { auth } from "../Firebase/Config";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const cookies = new Cookies();

const Profile = () => {
  const navigate = useNavigate();
  const userData = cookies.get("user");

  const SelectedCategoryId = cookies.get("CategoryId");

  const categories = [
    { id: 1, name: "Film & Animation" },
    { id: 2, name: "Autos & Vehicles" },
    { id: 10, name: "Music" },
    { id: 15, name: "Pets & Animals" },
    { id: 17, name: "Sports" },
    { id: 18, name: "Short Movies" },
    { id: 19, name: "Travel & Events" },
    { id: 20, name: "Gaming" },
    { id: 21, name: "Videoblogging" },
    { id: 22, name: "People & Blogs" },
  ];
  const handleCategoryClick = (categoryId, name) => {
    toast.success(`${name} selected`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    navigate("/home");
    cookies.set("CategoryId", categoryId);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div>
      <NavigationBar />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Card
        className="mx-auto mt-4"
        style={{ maxWidth: "400px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
      >
        <Card.Body>
          <Row>
            <Col md={8} className="text-center mx-auto">
              <Image
                src={userData?.photoURL ? userData?.photoURL : defaultuser}
                alt="Profile"
                roundedCircle
                fluid
              />
              <Card.Title className="mt-3">{userData?.displayName}</Card.Title>
              <Card.Text className="mt-3">{userData?.email}</Card.Text>
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Container className="mt-3">
        <Row className="justify-content-center">
          {categories.map((category) => (
            <Col key={category.id} xs={6} sm={4} md={3} lg={2}>
              <Button
                variant={
                  SelectedCategoryId === category.id ? "primary" : "secondary"
                }
                onClick={() => handleCategoryClick(category.id, category.name)}
                className="m-2 w-100"
              >
                {category.name}
              </Button>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
