import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { trim, getRebaseBlock, secondsUntilBlock, prettifySeconds, prettyVestingPeriod } from "../helpers";
import { changeApproval, calcBondDetails, calculateUserBondDetails } from '../actions/Bond.actions.js';
import { BONDS } from "../constants";

type Props = {
	bond: string,
  provider: any,
  address: string
};

function BondDai({ provider, address, bond }: Props) {
	const dispatch = useDispatch();

	const [showOptions, setShowOptions] = useState(false);
	const [view, setView] = useState("bond");
  const [quantity, setQuantity] = useState();

	const ohmBalance     = useSelector((state: any) => { return state.app.balances && state.app.balances.ohm });
	const sohmBalance    = useSelector((state: any) => { return state.app.balances && state.app.balances.sohm });
	const stakeAllowance = useSelector((state: any) => { return state.app.staking &&  state.app.staking.ohmStake });

	const currentBlock = useSelector((state: any) => { return state.app.currentBlock });
  const bondMaturationBlock = useSelector((state: any) => { return state.bonding[bond] && state.bonding[bond].bondMaturationBlock });
	
	const marketPrice    = useSelector((state: any) => { return state.bonding[bond] && state.bonding[bond].marketPrice });
  const bondPrice    = useSelector((state: any) => { return state.bonding[bond] && state.bonding[bond].bondPrice });
  const bondDiscount = useSelector((state: any) => { return state.bonding[bond] && state.bonding[bond].bondDiscount });
  const maxBondPrice = useSelector((state: any) => { return state.bonding[bond] && state.bonding[bond].maxBondPrice });
  const interestDue  = useSelector((state: any) => { return state.bonding[bond] && state.bonding[bond].interestDue });
  const pendingPayout = useSelector((state: any) => { return state.bonding[bond] && state.bonding[bond].pendingPayout });
  const debtRatio     = useSelector((state: any) => { return state.bonding[bond] && state.bonding[bond].debtRatio });
  const bondQuote     = useSelector((state: any) => { return state.bonding[bond] && state.bonding[bond].bondQuote });
	const balance = useSelector((state: any) => { return state.bonding[bond] && state.bonding[bond].balance });

	const daiBalance  = 100; // useSelector((state: any) => { return state.app.balances && state.app.daiBalance });
	const slippage = 5; //
	const recipientAddress = ""; //
	const daiBondDebtRatio = 20; //
	const daiBondDiscount = 100; //
	
	const hasEnteredAmount = () => {
    return !(isNaN(quantity as any) || quantity === 0 || quantity === '');
  }

  const vestingPeriod = () => {
    const seconds      = secondsUntilBlock(currentBlock, bondMaturationBlock);
    return prettifySeconds(seconds, 'day');
  };

  const vestingTime = () => {
    return prettyVestingPeriod(currentBlock, bondMaturationBlock);
  };

	const shortenAddress = (address: any) => {
		// added this just to get initial test working, probably needs to be a helper
	}

	const onRedeem = () => {

	}

	const onBond = () => {
    return alert("need to implement")
  };

	const setMax = () => {
    if (view === 'bond') {
      setQuantity(ohmBalance);
    } else {
      setQuantity(sohmBalance); //?
    }
  };

	async function loadBondDetails() {
    if (provider)
      await dispatch(calcBondDetails({ address, bond, value: quantity as any, provider, networkID: 1 }));
    // await dispatch(calculateUserBondDetails({}));
  }

  useEffect(() => {
    loadBondDetails();
  }, [provider, quantity]);


  const onSeekApproval = async (token: any) => {
    await dispatch(changeApproval({ address, token, provider, networkID: 1 }));
  };

  const hasAllowance = useCallback(() => {
    return stakeAllowance > 0;
  }, [stakeAllowance]);


	const toggleAdvancedMenu = () => {
		console.log('coming soon');
	}

 
  return (
		<div className="d-flex align-items-center justify-content-center min-vh-100">
		<div className="d-flex flex-row col justify-content-center">
			<div className="ohm-pairs d-sm-flex mr-2 d-none">
				<div className="ohm-pair" style={{zIndex: 1}}>
					<img src="https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png" />
				</div>
			</div>

			<div className="text-light align-self-center">
				<h3>
					DAI Bond
				</h3>
			</div>
		</div>

		<div style={{position: "relative"}}>
			{view !== "redeem" && 
				<a 
					role="button" 
					onClick={() => {toggleAdvancedMenu()}}
				>
					<i className="fa fa-cog fa-2x" />
				</a>
			}
			
			{/* 
				<AdvancedSettings
				v-bind:slippage="slippage"
				v-bind:recipientAddress="recipientAddress"
				v-bind:showAdvancedMenu="showAdvancedMenu"
				@onSlippageChange="onSlippageChange"
				@onRecipientChange="onRecipientChange"
			/> */}
		</div>

		<div className="dapp-modal-wrapper py-2 px-2 py-md-4 px-md-2 m-auto">
				<div className="swap-input-column">
					<div className="stake-toggle-row">
						<div className="btn-group" role="group">
							<button type="button" className={`btn ${view === 'bond' ? 'btn-secondary' : ''}`} onClick={() => {setView('bond')}}>Bond</button>
							<button type="button" className={`btn ${view === 'redeem' ? 'btn-secondary' : ''}`} onClick={() => {setView('redeem')}}>Redeem</button>
            </div>
					</div>
				</div>
				
				{view === 'bond' ?
					<>
						<div className="input-group ohm-input-group mb-3 flex-nowrap d-flex">
							<input
								onChange={e => setQuantity(e.target.value as any)}
								id="bond-input-id"
								type="number"
								className="form-control"
								placeholder="Type an amount"
							/>
							<button className="btn" type="button" onClick={setMax}>Max</button>
						</div>


						{view === "bond" && 
							(
							<div className="stake-price-data-column">
								<div className="stake-price-data-row">
									<p className="price-label">Balance</p>
									<p className="price-data">{ trim(daiBalance, 4) } SLP</p>
								</div>
								<div className="stake-price-data-row">
									<p className="price-label">Bond Price</p>
									<p className="price-data">{ trim(bondPrice, 2) } DAI</p>
								</div>
								<div className="stake-price-data-row">
									<p className="price-label">Market Price</p>
									<p id="bond-market-price-id" className="price-data">{ trim(marketPrice, 2) } DAI</p>
								</div>
								<div className={`stake-price-data-row' ${hasEnteredAmount() ? '' : 'd-none'}`}>
									<p className="price-label">You Will Get</p>
									<p id="bond-value-id" className="price-data">
										{ trim(bondQuote, 4) } OHM
									</p>
								</div>
								<div className={`stake-price-data-row' ${hasEnteredAmount() ? '' : 'd-none'}`}>
                <p className="price-label">Max You Can Buy</p>
                <p id="bond-value-id" className="price-data">
                  { trim(maxBondPrice, 4) } OHM
                </p>
              	</div>
								</div>
								)
						}
					</>
					:
						<>
							<div className="stake-price-data-column">
								<div className="stake-price-data-row">
									<p className="price-label">Balance</p>
									<p className="price-data">{ trim(daiBalance, 4)} SLP</p>
								</div>
								<div className="stake-price-data-row">
									<p className="price-label">Pending Rewards</p>
									<p id="bond-market-price-id" className="price-data">
										{ trim(interestDue, 4) } OHM
									</p>
								</div>
								<div className="stake-price-data-row">
									<p className="price-label">Claimable Rewards</p>
									<p id="bond-market-price-id" className="price-data">
										{ trim(pendingPayout, 4) } OHM
									</p>
								</div>
								<div className="stake-price-data-row">
									<p className="price-label">Time until fully vested</p>
									<p id="bond-market-price-id" className="price-data">
										{ vestingTime() }
									</p>
								</div>
							</div>
						</>
				}

				{view == "redeem" &&
					<div className="d-flex align-self-center mb-4">
						<div className="redeem-button" onClick={onRedeem}>Claim Rewards</div>
					</div>
				}
				{hasAllowance() && view == "bond" &&
					<div className="d-flex align-self-center mb-4">
						<div id="bond-button-id" className="redeem-button" onClick={onBond}>Bond</div>
					</div>
				}
				{hasAllowance() && view ==  "bond" && 
					<div className="d-flex align-self-center mb-4">
						<div id="bond-button-id" className="redeem-button" onClick={onSeekApproval}>Approve</div>
					</div>
				}

				{view !== "redeem" && 
					<div className="stake-price-data-column">
						<div className="stake-price-data-row">
							<p className="price-label">Slippage Tolerance</p>
							<p id="bond-value-id" className="price-data">{ slippage }%</p>
						</div>

						{ recipientAddress !== address ? 
							(
								<div className="stake-price-data-row">
									<p className="price-label">Recipient</p>
									{/* <p className="price-data">{{ shortenAddress(recipientAddress) }}</p> */}
								</div>
							) : (
								<div></div>
							)
						}
					</div>
				}
			</div>

			<div className="bond-data"> 
				<div className="row bond-data-row p-4">
					<div className="col-4 text-center">
						<p>Debt Ratio</p>
						<p>{ trim(daiBondDebtRatio / 10000000, 2) }%</p>
					</div>
					<div className="col-4 text-center">
            <p>Vesting Term</p>
            <p>{ vestingPeriod() }</p>
					</div>
					<div className="col-4 text-center">
						<p>ROI</p>
						<p>{ trim(daiBondDiscount * 100, 2) }%</p>
					</div>
				</div>
			</div>
		</div>

  );
}

export default BondDai;
