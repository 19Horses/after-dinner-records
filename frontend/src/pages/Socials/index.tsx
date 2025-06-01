import { Box, Flex } from '@react-three/flex';
import instagramImg from '../../assets/instagram-logo.jpg';
import spotifyImg from '../../assets/spotify-logo.png';
import { SocialType } from '../../queries/useGetSocials';
import { pages } from '../pages';
import { Social } from './Social';

export const Socials = ({ socials }: { socials: SocialType[] }) => {
  return (
    <group position={pages.socials.camera.lookAt}>
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection="row"
        plane="xy"
        size={[1.5, 0, 0]}
        centerAnchor
      >
        {socials.map((social) => (
          <Box
            width="auto"
            height="auto"
            flexGrow={1}
            centerAnchor
            key={social._id}
          >
            <Social
              link={social.link}
              src={social.platform === 'instagram' ? instagramImg : spotifyImg}
            />
          </Box>
        ))}
      </Flex>
    </group>
  );
};
