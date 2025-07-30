
// config/index.tsx

// import { cookieStorage, createStorage, http } from 'wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, arbitrum } from '@reown/appkit/networks'

// Get projectId from https://cloud.reown.com
export const projectId = 'b56e18d47c72ab683b10814fe9495694'

if (!projectId) {

  throw new Error('Project ID is not defined')
}

export const networks = [mainnet, arbitrum]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  // storage: createStorage({
  //   storage: cookieStorage
  // }),
  ssr: true,
  projectId,
  networks
})

export const config = wagmiAdapter.wagmiConfig