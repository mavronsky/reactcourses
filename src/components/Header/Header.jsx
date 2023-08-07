import styles from './Header.module.css';
import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import { logoutButtonStyle } from '../../styles';
import { logoutButtonText, userNameText } from './../../constants';

function Header() {
  return (
    <div className={styles.header}>
      <Logo />
      <div className={styles.userInfo}>
        <span>Eduard</span>
      </div>
      <Button style={logoutButtonStyle} text={logoutButtonText} />
    </div>
  );
}

export default Header;
