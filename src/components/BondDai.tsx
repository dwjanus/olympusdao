import React, { useState, useCallback, } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { trim } from "../helpers"; 
// import {  } from '../actions/Bond.actions.js'; <--- gonna need to make these too

type Props = {
  provider: any,
  address: string
};

function BondDai({ provider, address }: Props) {
	const dispatch = useDispatch();
	const [showOptions, setShowOptions] = useState(false);
	const [hasEnteredAmount, setHasEnteredAmount] = useState(false);
	const [isRedeem, setIsRedeem] = useState(false);
	
	const daiBalance  = 100; // useSelector((state: any) => { return state.app.balances && state.app.daiBalance });
	const marketPrice = 420.69; // useSelector((state: any) => { return state.app.marketPrice });
	const bondPrice = 333.69; // useSelector((state: any) => { return state.app.bondPrice});
	const maxBondPrice = 111.67894; // 
	const bondQuote = 200; //
	const interestDue = 0;
	const pendingPayout = 10000;
	const slippage = 5;
	const recipientAddress = ""; //
	const hasAllowance = false;
	const daiBondDebtRatio = 20;
	const daiBondDiscount = 100;
	
	const setMax = () => {

	}

	const onInputChange = (e: any) => {
		console.log(e)
		setHasEnteredAmount(true);
	}

	const shortenAddress = (address: any) => {
		// added this just to get initial test working, probably needs to be a helper
	}

	const vestingTime = () => {
		// this is just here to get a compile rn
	}

	const vestingPeriod = () => {
		return 100;
	}

	const redeem = () => {

	}

	const bond = () => {

	}

	const seekApproval = () => {

	}

 
  return (
		<>
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
			{
				// !isRedeem && 
				// <a 
				// 	role="button" 
				// 	onClick={toggleAdvancedMenu}>
				// 	<i className="fa fa-cog fa-2x" />
				// </a>
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
						<ul className=".toggle-switch" style={{ display: 'inline-flex', listStyle: 'none', color: 'white', backgroundColor: '#282828', borderColor: 'white', lineHeight: '1rem', borderRadius: '5rem', padding: '0.3rem', width: '15rem', height: '2.5rem' }}>
							<li style={{textAlign: 'center', width: '15rem', height: '2.5rem' }}>
								<input id="bond" type="radio" value="Bond" style={{position: 'absolute', display: 'block', opacity: '.01'}}/>
								<label className="active" style={{padding: '0.3rem' }}>Bond</label>
							</li>
							<li style={{textAlign: 'center', width: '15rem', height: '2.5rem' }}>
								<input id="redeem" type="radio" value="Redeem" style={{position: 'absolute', display: 'block', opacity: '.01'}}/>
								<label className="active" style={{padding: '0.3rem' }}>Redeem</label>
							</li>
						</ul>
					</div>
				</div>
				
				{ !isRedeem ? 
					(
						<>
							<div className="input-group ohm-input-group mb-3 flex-nowrap d-flex">
								<input
									onKeyUp={onInputChange}
									onChange={onInputChange}
									id="bond-input-id"
									type="number"
									className="form-control"
									placeholder="Type an amount"
								/>
								<button className="btn" type="button" onClick={setMax}>Max</button>
							</div>

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

								{ hasEnteredAmount && (
										<>
											<div className="stake-price-data-row">
												<p className="price-label">You Will Get</p>
												<p id="bond-value-id" className="price-data">
													{ trim(bondQuote, 4) } OHM
												</p>
											</div>
											</>
									) 
								}

								<div className="stake-price-data-row">
									<p className="price-label">Max You Can Buy</p>
										<p id="bond-value-id" className="price-data">
											{ trim(maxBondPrice, 4) } OHM
										</p>
								</div>
							</div>
						</>
					) : (
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
										{ vestingTime }
									</p>
								</div>
							</div>
						</>
					)
				}

				{
					isRedeem ? (
						<div className="d-flex align-self-center mb-4">
							<div className="redeem-button" onClick={redeem}>Claim Rewards</div>
						</div>
					) : (
						hasAllowance ? (
							<div className="d-flex align-self-center mb-4">
								<div id="bond-button-id" className="redeem-button" onClick={bond}>Bond</div>
							</div>
						) : (
							<div className="d-flex align-self-center mb-4">
								<div id="bond-button-id" className="redeem-button" onClick={seekApproval}>Approve</div>
							</div>
						)
					)
				}

				{ !isRedeem && 
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

			<div className="bond-data" style={{color: "#282828", width: '100%' }}>
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
	</>

  );
}

export default BondDai;
