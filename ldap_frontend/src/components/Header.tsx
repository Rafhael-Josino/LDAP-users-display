function Header() {
    return (
        <header className="header">
            <div className="container-header">
            <div className="header-left">
                <div className="header-logo"><img src="logo-intranet.png" alt="logo"/><span className="br-divider vertical mx-half mx-sm-1"></span></div>
            </div>
            <div className="header-bottom">
                <div className="header-menu">
                <div className="header-info">
                    <div className="header-title">LDAP Searcher</div>
                </div>
                </div>
            </div>
            </div>
      </header>
    );
}

export default Header;