var amounts;
var messages;
window.addEventListener('load', function() {
  if (typeof web3 !== 'undefined') {
    window.web3 = new Web3(web3.currentProvider);
    if (web3.currentProvider.isMetaMask === true)
    ifMetamask = true;
    else
    ifMetamask = false;
    web3.version.getNetwork(function(err, netId){
      if(!err)
      networkId = netId;
    })
    abi = [{"constant":true,"inputs":[],"name":"totalContribution","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"richDatabase","outputs":[{"name":"amount","type":"uint256"},{"name":"message","type":"bytes32"},{"name":"sender","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"buyerHistory","outputs":[{"name":"","type":"address[]"},{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"message","type":"bytes32"}],"name":"takeMyMoney","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"users","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
    escrowContract = web3.eth.contract(abi).at('0x9c0C5a14Fde1306686A8a270F271165AcDA670c2');
    listTransaction();
    getAmount();
  }}
)
function getAmount(){
  web3.eth.getAccounts(function(error, sender){
  escrowContract.users(sender[0], function(error, result){
    if(!error){
      document.getElementById("user-amount").innerHTML = web3.fromWei(result, 'ether');
    }
    else {
      console.log(error);
    }
  })
})
}
function buyAmount(message, value){
  web3.eth.getAccounts(function(error, sender){
  escrowContract.takeMyMoney.sendTransaction(message, {value: web3.toWei(value, 'ether'), gasLimit: 21000}, function(error, result){
    if(!error)
    return true;
    else {
      console.log(error);
    }
  })
})
}
function listTransaction(){
  var totalAddresses = 10;
      escrowContract.buyerHistory.call(function (error, result){
      if(!error){
        amounts =  result[1];
        messages = result[2];
        var left = '<tr><td style="text-align:left">';
        var center = '.</td><td style="text-align:center">';
        var right = ' ETH</td><td style="text-align:right">';
        var amounts;
        var messages;
        var str = '';
        for(var i = 0; i < 10; i++) {
          str += left + (i+1) + center + web3.fromWei(amounts[i], 'ether') + right + web3.toAscii(messages[i], 'hex') + '</td></tr>';
        }
        document.getElementById("tbody").innerHTML = str;
      }
      else {
        console.log(error);
      }
    })
}
