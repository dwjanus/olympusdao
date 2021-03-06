import { ethers } from "ethers";
import { addresses, Actions } from "../constants";
import { abi as ierc20Abi } from '../abi/IERC20.json';
import { abi as OHMPreSale } from '../abi/OHMPreSale.json';
import { abi as OlympusStaking } from '../abi/OlympusStaking.json';
import { abi as MigrateToOHM } from '../abi/MigrateToOHM.json';
import { abi as sOHM } from '../abi/sOHM.json';
import { abi as LPStaking } from '../abi/LPStaking.json';
import { abi as DistributorContract } from '../abi/DistributorContract.json';
import { abi as BondContract } from '../abi/BondContract.json';
import { abi as DaiBondContract } from '../abi/DaiBondContract.json';


const parseEther = ethers.utils.parseEther;

export const fetchAccountSuccess = payload => ({
  type: Actions.FETCH_ACCOUNT_SUCCESS,
  payload,
});

export const loadAccountDetails = ({ networkID, provider, address }) => async dispatch => {
  console.log("networkID = ", networkID)
  console.log("addresses = ",addresses)

  let ohmContract, ohmBalance = 0, sohmBalance = 0, stakeAllowance = 0, unstakeAllowance = 0;
  let lpStakingContract, lpStaked = 0, pendingRewards = 0;
  let lpStakeAllowance, distributorContract, lpBondAllowance = 0, daiBondAllowance = 0;
  let migrateContract, aOHMAbleToClaim = 0;

  const daiContract = new ethers.Contract(addresses[networkID].DAI_ADDRESS, ierc20Abi, provider);
  const daiBalance  = await daiContract.balanceOf(address);

  if (addresses[networkID].OHM_ADDRESS) {
    const ohmContract = new ethers.Contract(
      addresses[networkID].OHM_ADDRESS,
      ierc20Abi,
      provider
    );
    ohmBalance = await ohmContract.balanceOf(address);
    stakeAllowance = await ohmContract.allowance(
      address,
      addresses[networkID].STAKING_ADDRESS
    );
  }

  if (addresses[networkID].DAI_BOND_ADDRESS) {
    daiBondAllowance = await daiContract.allowance(address, addresses[networkID].DAI_BOND_ADDRESS);
  }

  if (addresses[networkID].SOHM_ADDRESS) {
    const sohmContract = await new ethers.Contract(
      addresses[networkID].SOHM_ADDRESS,
      ierc20Abi,
      provider
    );
    sohmBalance = await sohmContract.balanceOf(address);
    unstakeAllowance = await sohmContract.allowance(
      address,
      addresses[networkID].STAKING_ADDRESS
    );
  }

  return dispatch(fetchAccountSuccess({
    balances: {
      dai: ethers.utils.formatEther(daiBalance),
      ohm: ethers.utils.formatUnits(ohmBalance, 'gwei'),
      sohm: ethers.utils.formatUnits(sohmBalance, 'gwei'),
    },
    staking: {
      ohmStake: stakeAllowance,
      ohmUnstake: unstakeAllowance,
    },
    bonding: {
      daiAllowance: daiBondAllowance
    }
  }))


};
