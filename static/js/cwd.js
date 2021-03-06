// Copyright 2012 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

define(['jquery', 'util'], function($, util) {
  "use strict";

  var cwdList = $('#cwd');

  var cwdItemProto = cwdList.children('.cwd-item.proto')
    .detach()
    .removeClass('proto');

  var cwdHistoryList = $('#cwd-history-list');

  var cwdHistoryItemProto = cwdHistoryList.children('.cwd-history-item.proto')
    .detach()
    .removeClass('proto');

  function parseToDom(cwd, runCommand) {
    cwdList.empty();
    cwdHistoryList.empty();

    var dirSoFar = "";
    ['/'].concat(cwd.split('/')).forEach(function(piece) {
      if ("" !== piece) {
        dirSoFar = dirSoFar + piece + (piece === '/' ? '' : '/');
        var cmd = 'cd ' + util.escapeShellArgument(dirSoFar);
        var cwdItem = cwdItemProto.clone();
        cwdItem.find('a')
          .text(piece)
          .bind('click', function(e) {runCommand(cmd);});
        cwdList.append(cwdItem);
      }
    });

    var cwdHistory = [];

    if (localStorage.getItem('cwdHistory')) {
      cwdHistory = JSON.parse(localStorage.getItem('cwdHistory'));
    }

    cwdHistory.forEach(function(d) {
      var cwdHistoryItem = cwdHistoryItemProto.clone();
      var cmd = 'cd ' + util.escapeShellArgument(d);

      cwdHistoryItem.find('a')
        .text(d)
        .on('click', function(e) {runCommand(cmd);});

      cwdHistoryList.append(cwdHistoryItem);
    });

    if (cwdHistory.length == 0 || cwdHistory[0] !== cwd) {
      cwdHistory.unshift(cwd);

      localStorage.setItem('cwdHistory', JSON.stringify(cwdHistory));
    }
  }

  return {
    parseToDom: parseToDom
  }

});
