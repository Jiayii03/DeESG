import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return (
    <div className="navbar sticky top-0 z-50 bg-base-200 bg-opacity-30 py-2 px-6">
      <div className="flex flex-grow justify-between gap-3">
        <div className="flex flex-auto items-center justify-between gap-3">
          <div>
            <div className="flex flex-shrink-0 flex-row items-center gap-1 py-2">
              <div className="flex ml-3">
                <img src="/app_logo.png" alt="App Logo" className="h-12 w-12" />
              </div>
            </div>
          </div>
          <div className="flex me-3">
            <ConnectButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
