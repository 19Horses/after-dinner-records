import { Vector3 } from 'three';
import instagramImg from '../../assets/instagram-logo.jpg';
import spotifyImg from '../../assets/spotify-logo.png';
import { SocialType } from '../../queries/useGetSocials';
import { pages } from '../pages';
import { Social } from './Social';

export const Socials = ({ socials }: { socials: SocialType[] }) => {
  return (
    <group>
      {socials.map((social) => {
        const position =
          social.platform === 'instagram'
            ? new Vector3(
                pages.socials.camera.lookAt.x - 0.5,
                pages.socials.camera.lookAt.y,
                pages.socials.camera.lookAt.z
              )
            : new Vector3(
                pages.socials.camera.lookAt.x + 0.5,
                pages.socials.camera.lookAt.y,
                pages.socials.camera.lookAt.z
              );
        return (
          <Social
            link={social.link}
            key={social.documentId}
            position={position}
            src={social.platform === 'instagram' ? instagramImg : spotifyImg}
          />
        );
      })}
    </group>
  );
};
