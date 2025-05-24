import WalletConnect from "./WalletConnect";

const Header = () =>  {
    return (
        <div className="flex justify-between mx-5 ">
            <div className="flex items-center">
            <img className="w-20 h-20" src="../../public/logo.png" />
            <div>
            <h2 className="text-white">StakeMe</h2>
            <h2 className="text-white">v1.0</h2>
            </div>
            </div>
            
            <WalletConnect />
        </div>
    )
}

export default Header;