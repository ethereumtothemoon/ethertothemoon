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
    abi = [{"constant":true,"inputs":[],"name":"totalContribution","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"richDatabase","outputs":[{"name":"amount","type":"uint256"},{"name":"message","type":"bytes32"},{"name":"sender","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"buyerHistory","outputs":[{"name":"","type":"address[]"},{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"message","type":"bytes32"}],"name":"takeMyMoney","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"users","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"NewRich","type":"event"}]

    escrowContract = web3.eth.contract(abi).at('0x498F9650AFb05D397F1317DD391B003c99F4df0a');
  }}
)
function getAmount(){
  web3.eth.getAccounts(function(error, sender){
  escrowContract.users(sender[0], function(error, result){
    if(!error)
    console.log(result);
    else {
      console.log(error);
    }
  })
}}
function buyAmount(message){
  web3.eth.getAccounts(function(error, sender){
  escrowContract.takeMyMoney.sendTransaction(message, {value: web3.toWei(value, 'ether'), gasLimit: 21000}, function(error, result){
    if(!error)
    console.log(result);
    else {
      console.log(error);
    }
  })
}}
function listTransaction(){
  // var tbody = document.getElementById("tbody");
  // while (tbody.firstChild) {
  //   tbody.removeChild(tbody.firstChild);
  // }
  var totalAddresses = 10;
  for (var addressNumber = 0; addressNumber < totalAddresses; addressNumber++) (function(addressNumber){
      escrowContract.buyerHistory.call(function (error, result){
      if(!error){
        showList(result);
      }
      else {
        console.error(error)
      }
    })
  })
}
function showList(){
  for (var count = 0; count < 10; count++) (function(count){
    var row = document.createElement('tr');
    for (rowCount = 0; rowCount < 3; rowCount++) {
      if (rowCount == 0){
        var cell = document.createElement('td');
        cell.appendChild(document.createTextNode(result[rowCount][count]));
        row.appendChild(cell);
      }
      if (rowCount == 1){
        var cell = document.createElement('td');
        cell.appendChild(document.createTextNode(web3.fromWei(result[rowCount][count],'ether')));
        row.appendChild(cell);
      }
      if (rowCount == 2){
        var cell = document.createElement('td');
        cell.appendChild(document.createTextNode(web3.toAscii(result[rowCount][count],'hex')));
        row.appendChild(cell);
      }}
      var table = document.getElementById('table');
      table.appendChild(row);
    }) (count);
  }v
