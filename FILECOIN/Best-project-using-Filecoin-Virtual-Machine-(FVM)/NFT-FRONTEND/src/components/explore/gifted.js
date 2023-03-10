import React, { Component } from 'react'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import ZonuletNFT from '../../abis/ZonuletNFT.json'
import ZonuletNFTSale from '../../abis/ZonuletNFTSale.json'
import ZonuletAvatars from '../../abis/ZonuletAvatars.json'
import ZonuletVerified from '../../abis/ZonuletVerified.json'
import Img from 'react-cool-img'
import ReactPlaceholder from 'react-placeholder'
import LazyLoad from 'react-lazyload'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import ScrollToTop from 'react-scroll-to-top'
import Web3 from 'web3'

class Gifted extends Component {
  render() {
    return (
      <div>
        <ScrollToTop smooth/>
        <div className="head-title col-auto mx-4">
          <h4 className="mb-0 font-weight-normal">Recently Gifted NFTs</h4>
        </div>
        <div className="container-fluid mb-5 explore-adj">
          <div className="row justify-content-around">
            <p align="center" className="text-secondary">
              This is where you can view recently gifted Zonulet NFTs! This displays the last 15 gifted Zonulet NFTs!
            </p>
            <ReactPlaceholder
              type="rect"
              ready={this.state.ready}
              showLoadingAnimation={true}
              color="#333"
              style={{ width: '300px', height: '300px', borderRadius: '15px' }}
            >
              {this.state.images.reverse().map((id, key) => {
                return (
                  // (this.state.approved[key] && (this.state.owners[key] !== this.state.account) && this.state.ready === true) ? (
                  this.state.ready === true ? (
                    <div key={key} className="col-md-2 card bg-light m-3 p-2">
                      <LazyLoad height={300}>
                        <ReactPlaceholder
                          type="rect"
                          ready={this.state.ready}
                          showLoadingAnimation={true}
                          color="#333"
                          style={{
                            width: '300px',
                            height: '300px',
                            borderRadius: '15px',
                          }}
                        >
                          <Link
                            to={{
                              pathname: `/nft/${this.state.imageData_id[key]}`,
                            }}
                          >
                            <form onSubmit={event => {}}>
                              <div className="col-auto max-250">
                                <div className="text-secondary idbadge" align="center">
                                  ID #{this.state.imageData_id[key]}
                                </div>
                                {typeof this.state.imageData_ipfsData[key] !== 'undefined' ? (
                                  this.state.imageData_mimeType[key] === 'image/jpeg' ||
                                  this.state.imageData_mimeType[key] === 'image/png' ||
                                  this.state.imageData_mimeType[key] === 'image/gif' ? (
                                    <Img
                                      alt="NFT"
                                      className="token rounded"
                                      src={
                                        `${process.env.REACT_APP_INFURA_GATEAWAY}` + this.state.imageData_ipfsData[key]
                                      }
                                      cache
                                      style={{ background: '#21263e' }}
                                    />
                                  ) : this.state.imageData_mimeType[key] === 'video/mp4' ? (
                                    <video
                                      alt="NFT"
                                      className="token rounded"
                                      autoPlay={true}
                                      muted={true}
                                      loop={true}
                                      controls
                                      playsInline
                                      src={
                                        `${process.env.REACT_APP_INFURA_GATEAWAY}` + this.state.imageData_ipfsData[key]
                                      }
                                      type="video/mp4"
                                    >
                                      <source
                                        src={
                                          `${process.env.REACT_APP_INFURA_GATEAWAY}` +
                                          this.state.imageData_ipfsData[key]
                                        }
                                        type="video/mp4"
                                      ></source>
                                    </video>
                                  ) : this.state.imageData_mimeType[key] === 'model/gltf-binary' ? (
                                    <model-viewer
                                      src={
                                        `${process.env.REACT_APP_INFURA_GATEAWAY}` + this.state.imageData_ipfsData[key]
                                      }
                                      alt={this.state.imageData_name[key]}
                                      ar
                                      ar-modes="webxr scene-viewer quick-look"
                                      environment-image="neutral"
                                      auto-rotate
                                      camera-controls
                                      style={{ width: '100%', height: '250px' }}
                                    ></model-viewer>
                                  ) : null
                                ) : null}
                              </div>
                              <div className="m-2" align="center">
                                {this.state.imageData_name[key]}
                              </div>

                              {/* <div className="m-2" align="center">
                                {this.state.imageData_buyeripfs[key] !== '' &&
                                (this.state.imageData_buyermim[key] === 'image/jpeg' ||
                                  this.state.imageData_buyermim[key] === 'image/png' ||
                                  this.state.imageData_buyermim[key] === 'image/gif') ? (
                                  <div
                                    style={{
                                      position: 'relative',
                                      width: '45px',
                                    }}
                                  >
                                    <img
                                      src={
                                        `${process.env.REACT_APP_INFURA_GATEAWAY}` +
                                        this.state.imageData_buyeripfs[key]
                                      }
                                      alt=""
                                      border="0"
                                      height="50px"
                                      width="50px"
                                      style={{ borderRadius: '50%' }}
                                    />

                                    {this.state.imageData_verified[key] === true ? (
                                      <div
                                        style={{
                                          position: 'absolute',
                                          bottom: '-3px',
                                          right: '-1px',
                                        }}
                                      >
                                        <svg
                                          width="16"
                                          height="16"
                                          viewBox="0 0 12 12"
                                          fill="#4E78FF"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z"
                                            fill="#feda03"
                                          ></path>
                                          <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z"
                                            fill="#151a2f"
                                          ></path>
                                        </svg>
                                      </div>
                                    ) : null}
                                  </div>
                                ) : (
                                  <div
                                    style={{
                                      position: 'relative',
                                      marginTop: '10px',
                                      marginBottom: '0px',
                                      width: '45px',
                                    }}
                                  >
                                    <Jazzicon
                                      diameter={45}
                                      seed={jsNumberForAddress(this.state.imageData_receiver[key])}
                                    />

                                    {this.state.imageData_verified[key] === true ? (
                                      <div
                                        style={{
                                          position: 'absolute',
                                          bottom: '-3px',
                                          right: '-2px',
                                        }}
                                      >
                                        <svg
                                          width="14"
                                          height="14"
                                          viewBox="0 0 12 12"
                                          fill="#4E78FF"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z"
                                            fill="#feda03"
                                          ></path>
                                          <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z"
                                            fill="#151a2f"
                                          ></path>
                                        </svg>
                                      </div>
                                    ) : null}
                                  </div>
                                )}{' '}
                              </div> */}
                             {/* <div>
                               <span>
                             {this.state.name === '' ? ' ADDRESS' : <strong className='txtPinkBlack'>{' ' + this.state.name}</strong>}
                             </span>
                             </div> */}
                            </form>
                          </Link>
                        </ReactPlaceholder>
                      </LazyLoad>
                    </div>
                  ) : null
                )
              })}
            </ReactPlaceholder>
          </div>
        </div>
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      contract: null,
      sale_contract: null,
      totalSupply: 0,
      images: [],
      owners: [],
      imageData_name: [],
      imageData_ipfsData: [],
      imageData_mimeType: [],
      imageData_category: [],
      imageData_price: [],
      imageData_id: [],
      imageData_receiver: [],
      imageData_buyeripfs: [],
      imageData_buyermim: [],
      imageData_verified: [],
      selling_to: '',
      gtransactions: [],
      selling_price: null,
      token_sale_contract: null,
      token_price: 0,
      approved: [],
    }
  }

  async componentWillMount() {
    await this.loadBlockchain()
    // await this.loadTokenSaleContract()
  }

  async loadBlockchain() {
    
    const web3 = new Web3('https://api.hyperspace.node.glif.io/rpc/v1')

    const networkId = 3141
    const networkData = ZonuletNFT.networks[networkId]
    if (networkData) {
      const abi = ZonuletNFT.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)

      const sale_networkData = ZonuletNFTSale.networks[networkId]
      const sale_abi = ZonuletNFTSale.abi
      const sale_address = sale_networkData.address
      const sale_contract = new web3.eth.Contract(sale_abi, sale_address)
      this.setState({ sale_contract })

      this.setState({ contract })
      const totalSupply = await contract.methods.totalSupply().call()
      // console.log(totalSupply)
      this.setState({ totalSupply })

      const abiblack = [{"stateMutability":"nonpayable","type":"constructor","inputs":[]},{"type":"event","name":"SetBlackListedAddress","inputs":[{"internalType":"address","indexed":true,"name":"hashAddress","type":"address"},{"name":"blacklisted","type":"bool","indexed":false,"internalType":"bool"}],"anonymous":false},{"inputs":[{"name":"nftID","indexed":true,"type":"uint256","internalType":"uint256"},{"name":"blacklisted","type":"bool","indexed":false,"internalType":"bool"}],"name":"SetBlackListedNFT","anonymous":false,"type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"idupdates","type":"function","outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"inputs":[],"name":"owner","stateMutability":"view","type":"function","outputs":[{"internalType":"address","type":"address","name":""}]},{"type":"function","outputs":[{"type":"address","name":"","internalType":"address"}],"stateMutability":"view","name":"updates","inputs":[{"type":"uint256","internalType":"uint256","name":""}]},{"outputs":[],"stateMutability":"nonpayable","inputs":[{"internalType":"address","name":"addy","type":"address"},{"internalType":"bool","name":"blacklisted","type":"bool"}],"type":"function","name":"setBlackListedAddress"},{"inputs":[{"internalType":"uint256","name":"nftID","type":"uint256"},{"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"setBlackListedNFT","outputs":[],"type":"function","stateMutability":"nonpayable"},{"outputs":[{"type":"bool","internalType":"bool","name":""}],"stateMutability":"view","name":"getBlackListedAddress","inputs":[{"name":"blAddress","internalType":"address","type":"address"}],"type":"function"},{"type":"function","name":"getBlackListedNFT","inputs":[{"name":"nftID","type":"uint256","internalType":"uint256"}],"stateMutability":"view","outputs":[{"internalType":"bool","type":"bool","name":""}]},{"stateMutability":"view","name":"AddyCount","type":"function","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"inputs":[]},{"outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"type":"function","inputs":[],"name":"IDCount","stateMutability":"view"}]      

      const contractblack = new web3.eth.Contract(abiblack, '0x5bee4C3E37B9f6dFc7E9da3bE48667651b96FA08')

      this.setState({ contractblack })

      const VerifiedAbi = ZonuletVerified.abi
      const VerifiedAddress = '0xD1E7C945945a8Bf16E7aa1bcB18A98aa2159B94D' //ZonuletVerified
      const VerifiedContracts = new web3.eth.Contract(VerifiedAbi, VerifiedAddress)

      const AvatarsAbi = ZonuletAvatars.abi
      const AvatarsAddress = '0x6ac6F871BA34B5Ce59EAF88D782b6e307207AC1B' //ZonuletAvatars
      const AvatarsContracts = new web3.eth.Contract(AvatarsAbi, AvatarsAddress)

      this.setState({ AvatarsContracts })

      this.setState({ VerifiedContracts })

      var SI_SYMBOL = ['', 'k', 'M', 'B', 'T', 'P', 'E']

      function abbreviateNumber(number) {
        // what tier? (determines SI symbol)
        var tier = (Math.log10(Math.abs(number)) / 3) | 0

        // if zero, we don't need a suffix
        if (tier == 0) return number

        // get suffix and determine scale
        var suffix = SI_SYMBOL[tier]
        var scale = Math.pow(10, tier * 3)

        // scale the number
        var scaled = number / scale

        // format number and add suffix
        return scaled.toFixed(1) + suffix
      }

      const gtransactions = await sale_contract.getPastEvents('GiftedNFT', {
        fromBlock: 136993,
        toBlock: 'latest',
      })
      this.setState({ gtransactions })

      var j = 0
      if (gtransactions.length > 0) {
        var n = gtransactions.length
        while (n--) {
          var gtransaction = gtransactions[n]
          if (typeof gtransaction !== 'undefined') {
            if (gtransaction.returnValues !== 'undefined') {
              if (j < 15) {
                const metadata = await contract.methods.imageData(gtransaction.returnValues._tokenId).call()

                const getIPFS = await AvatarsContracts.methods.getIPFSHash(gtransaction.returnValues._receiver).call()
                const getMIME = await AvatarsContracts.methods.getMIMEType(gtransaction.returnValues._receiver).call()
                const getVerified = await VerifiedContracts.methods.getVerified(gtransaction.returnValues._receiver).call()

                // const blacklisted = await contractblack.methods.getBlackListedNFT(gtransaction.returnValues._tokenId).call();

                // if (!blacklisted) {
                // console.log(metadata)
                this.setState({
                  images: [...this.state.images, metadata.name],
                  imageData_name: [...this.state.imageData_name, metadata.name],
                  imageData_ipfsData: [...this.state.imageData_ipfsData, metadata.ipfsData],
                  imageData_mimeType: [...this.state.imageData_mimeType, metadata.mimeType],
                  imageData_category: [...this.state.imageData_category, metadata.category],
                  imageData_price: [...this.state.imageData_price, metadata.price],
                  imageData_receiver: [...this.state.imageData_receiver, gtransaction.returnValues._receiver],
                  imageData_buyeripfs: [...this.state.imageData_buyeripfs, getIPFS],
                  imageData_buyermim: [...this.state.imageData_buyermim, getMIME],
                  imageData_verified: [...this.state.imageData_verified, getVerified],
                  imageData_id: [...this.state.imageData_id, gtransaction.returnValues._tokenId],
                })

                this.setState({ ready: true })
                j++
              }
            }
          }
        }
      }

      
    } else {
      toast.error("Switch to Filecoin Testnet!")
    }

    
  }

}
export default Gifted
