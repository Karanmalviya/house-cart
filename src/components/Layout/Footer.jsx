import styled from "styled-components";
import {
  BsInstagram,
  BsFacebook,
  BsTwitter,
  BsGithub,
  BsFillTelephoneFill,
} from "react-icons/bs";
import { AiFillMail, AiOutlineMail } from "react-icons/ai";
import { ImLocation } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
const Container = styled.div`
  display: flex;
  margin-top: 6rem;
  background-color: #1f5156;
  color: #fff;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  text-decoration: none;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;
const Autho = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #1f5156;
  color: #fff;
`;
const Copyright = styled.small`
  display: flex;
  justify-content: center;
`;

export default function Footer() {
  const navigate = useNavigate();
  return (
    <div>
      <Container>
        <Left>
          <Logo>House Cart</Logo>
          <Desc>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don’t look even slightly
            believable.
          </Desc>
          <SocialContainer>
            <SocialIcon color="3B5999">
              <BsFacebook />
            </SocialIcon>
            <SocialIcon color="E4405F">
              <BsInstagram />
            </SocialIcon>
            <SocialIcon color="55ACEE">
              <BsTwitter />
            </SocialIcon>
            <SocialIcon color="171515">
              <BsGithub />
            </SocialIcon>
          </SocialContainer>
        </Left>
        <Center>
          <Title>Useful Links</Title>
          <List>
            <ListItem className="link-deco">
              <Link to="/">Home</Link>
            </ListItem>
            <ListItem>
              <Link to="/profile">My Account</Link>
            </ListItem>
            <ListItem>
              <Link to="explore">Explore</Link>
            </ListItem>
            <ListItem>
              <Link to="signin">Sign In</Link>
            </ListItem>
            <ListItem>
              <Link to="offer">Offers</Link>
            </ListItem>
            <ListItem>
              <Link to="signup">Sign Up</Link>
            </ListItem>
            <ListItem>Terms</ListItem>
          </List>
        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <ImLocation style={{ marginRight: "10px" }} /> 622 Dixie Path ,
            South Tobinchester 98336
          </ContactItem>
          <ContactItem>
            <BsFillTelephoneFill style={{ marginRight: "10px" }} /> +1 234 56 78
          </ContactItem>
          <ContactItem>
            <AiOutlineMail style={{ marginRight: "10px" }} /> contact@karan.dev
          </ContactItem>
          <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </Right>
      </Container>
      <Autho>
        <Copyright>&copy; KARAN MALVIYA. All rights reserved</Copyright>
        <Copyright>Designed & Developed by Karan Malviya</Copyright>
      </Autho>
    </div>
  );
}
