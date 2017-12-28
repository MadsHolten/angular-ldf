import { Component, OnInit } from '@angular/core';

import * as ldf from 'ldf-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // var fragmentsClient = new ldf.FragmentsClient('http://fragments.dbpedia.org/2015/en');
    var endpoints = ['https://bot-ldf.herokuapp.com/P111111','https://ice-engineer.herokuapp.com/P111111']
    var fragmentsClient = new ldf.FragmentsClient(endpoints);

    var query = 'PREFIX bot: <https://w3id.org/bot#>\
    SELECT * \
    WHERE { \
        ?s a bot:Space .\
        ?s <https://example.com/ice#heatingDemand> ?hd .\
    } LIMIT 100';

    var resultsIterator = new ldf.SparqlIterator(query, { fragmentsClient: fragmentsClient });

    // Display a result every 0.1 seconds
    setInterval(() => {
        var result = resultsIterator.read();
        if (result) console.log(result);
      }, 100);
  }

}
