import { Pipe, PipeTransform } from '@angular/core'

@Pipe({name: 'tweettext'})
export class TweetTextPipe implements PipeTransform {
  transform(input: string): string {

    // links
    let result = input.replace(/\b(((https*\:\/\/)|www\.)[^\"\']+?)(([!?,.\)]+)?(\s|$))/g, function(link, m1, m2, m3, m4) {
      var http = m2.match(/w/) ? 'http://' : '';
      return '<a class="twtr-hyperlink" target="_blank" href="' + http + m1 + '">' + ((m1.length > 25) ? m1.substr(0, 24) + '...' : m1) + '</a>' + m4;
    });

    // at
    result = result.replace(/\B[@＠]([a-zA-Z0-9_]{1,20})/g, function(m, username) {
      return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/intent/user?screen_name=' + username + '">@' + username + '</a>';
    });

    // list
    result = result.replace(/\B[@＠]([a-zA-Z0-9_]{1,20}\/\w+)/g, function(m, userlist) {
      return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/' + userlist + '">@' + userlist + '</a>';
    });

    // hash
    result = result.replace(/(^|\s+)#(\w+)/gi, function(m, before, hash) {
      return before + '<a target="_blank" class="twtr-hashtag" href="http://twitter.com/search?q=%23' + hash + '">#' + hash + '</a>';
    });

    return result;
  }
}
