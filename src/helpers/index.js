
import { EPOCH_INTERVAL, BLOCK_RATE_SECONDS } from "../constants";
import { ethers } from "ethers";
import { addresses } from "../constants";
import { abi as ierc20Abi } from '../abi/IERC20.json';
import { abi as CirculatingSupplyContract } from '../abi/CirculatingSupplyContract.json';
import { abi as PairContract } from '../abi/PairContract.json';
export { default as Transactor } from "./Transactor";

export async function getMarketPrice({ networkID, provider }) {
  const pairContract = new ethers.Contract(
    addresses[networkID].LP_ADDRESS,
    PairContract,
    provider
  );
  const reserves = await pairContract.getReserves();
  const marketPrice = reserves[1] / reserves[0];

  // commit('set', { marketPrice: marketPrice / Math.pow(10, 9) });
  return marketPrice;
}

export async function getTokenSupply({provider, networkID}) {
  const ohmContract = new ethers.Contract(
    addresses[networkID].OHM_ADDRESS,
    ierc20Abi,
    provider
  );

  const circulatingSupplyContract = new ethers.Contract(
    addresses[networkID].CIRCULATING_SUPPLY_ADDRESS,
    CirculatingSupplyContract,
    provider
  );

  const ohmCircSupply  = await circulatingSupplyContract.OHMCirculatingSupply();
  const ohmTotalSupply = await ohmContract.totalSupply();

  return {
    circulating: ohmCircSupply,
    total: ohmTotalSupply,
  }
}



export function shorten(str) {
  if (str.length < 10) return str;
  return `${str.slice(0, 6)}...${str.slice(str.length - 4)}`;
}

export function trim(number, precision) {
  if (number == undefined) {
    number = 0;
  }
  const array = number.toString().split('.');
  if (array.length === 1)
    return number.toString();

  array.push(array.pop().substring(0, precision));
  const trimmedNumber = array.join('.');
  return trimmedNumber;
}

export function getRebaseBlock(currentBlock) {
  return currentBlock + EPOCH_INTERVAL - (currentBlock % EPOCH_INTERVAL);
}


export function secondsUntilBlock(startBlock, endBlock) {
  if (startBlock % EPOCH_INTERVAL === 0) {
    return 0;
  }

  const blocksAway = endBlock - startBlock;
  const secondsAway = blocksAway * BLOCK_RATE_SECONDS;

  return secondsAway;
}

export function prettyVestingPeriod(currentBlock, vestingBlock) {
  if (vestingBlock === 0) {
    return '';
  }

  const seconds = secondsUntilBlock(currentBlock, vestingBlock);
  if (seconds < 0) {
    return 'Fully Vested';
  } else {
    return prettifySeconds(seconds);
  }
}

export function prettifySeconds(seconds, resolution) {
  if (seconds !== 0 && !seconds) {
    return '';
  }

  const d = Math.floor(seconds / (3600*24));
  const h = Math.floor(seconds % (3600*24) / 3600);
  const m = Math.floor(seconds % 3600 / 60);

  if (resolution === 'day') {
    return d + (d == 1 ? " day" : " days");
  } else {
    const dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    const hDisplay = h > 0 ? h + (h == 1 ? " hr, " : " hrs, ") : "";
    const mDisplay = m > 0 ? m + (m == 1 ? " min" : " mins") : "";

    return dDisplay + hDisplay + mDisplay;
  }

}
