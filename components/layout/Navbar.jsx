import { AppBar, Box, Button, styled, Toolbar } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = (props) => {
  const buttons = [
    { link: '/', name: 'Accueil', icon: 'dofus' },
    { link: '/stuff', name: 'Stuff', icon: 'character' },
    { link: '/equipment', name: 'Equipements', icon: 'equipment' },
    { link: '/weapons', name: 'Armes', icon: 'weapons' },
    { link: '/pets', name: 'Familiers & Montures', icon: 'pets' },
    { link: '/fight', name: 'Combattre !', icon: 'monsters' },
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
    color: var(--foreground);
    background-color: var(--background-light);
    z-index: 1400;
  }

  nav > div {
    padding: 0;
  }

  button {
    color: var(--foreground);
    margin: 0 4px;
  }

  a {
    color: inherit;
    text-decoration: inherit;
  }

  nav div > a:first-of-type {
    margin-right: 20px;
    border-right: 1px solid var(--background-lighter);
  }
`;
