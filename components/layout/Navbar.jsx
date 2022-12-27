import { AppBar, Box, Button, styled, Toolbar } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = (props) => {
  const buttons = [
    { link: '/', name: 'Accueil', icon: 'dofus' },
    { link: '/stuffs', name: 'Stuffs', icon: 'character' },
    { link: '/equipment', name: 'Equipements', icon: 'equipment' },
    { link: '/weapons', name: 'Armes', icon: 'weapons' },
    { link: '/pets', name: 'Familiers', icon: 'pets' },
    { link: '/mounts', name: 'Montures', icon: 'mounts' },
  ];

  return (
    <Box className={props.className} sx={{ flexGrow: 1 }}>
      <AppBar component="nav">
        <Toolbar>
          {buttons.map((button) => (
            <Link key={button.link} href={button.link}>
              <Button>
                <Image src={`/images/ui/${button.icon}.png`} alt="menu icon" width={32} height={32} />
                {button.name}
              </Button>
            </Link>
          ))}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default styled(Navbar)`
  nav {
    color: #ffffff;
    background-color: #303030;
  }
  button {
    color: #ffffff;
    background-color: #303030;
    margin: 0 4px;
  }
  a {
    color: inherit;
    text-decoration: inherit;
  }
`;
