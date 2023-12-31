<%@ page import = "  javax.servlet.*, javax.servlet.http.*, java.io.*, org.apache.lucene.analysis.*, org.apache.lucene.analysis.standard.StandardAnalyzer, org.apache.lucene.document.*, org.apache.lucene.index.*, org.apache.lucene.search.*, org.apache.lucene.queryParser.*, java.net.URLEncoder" %>

<%
/*
        Author: Andrew C. Oliver, SuperLink Software, Inc. (acoliver2@users.sourceforge.net)

        This jsp page is deliberatly written in the horrible java directly embedded 
        in the page style for an easy and concise demonstration of Lucene.
        Due note...if you write pages that look like this...sooner or later
        you'll have a maintenance nightmare.  If you use jsps...use taglibs
        and beans!  That being said, this should be acceptable for a small
        page demonstrating how one uses Lucene in a web app. 

        This is also deliberately overcommented. ;-)

*/
%>
<%!
public String escapeHTML(String s) {
  s = s.replaceAll("&", "&amp;");
  s = s.replaceAll("<", "&lt;");
  s = s.replaceAll(">", "&gt;");
  s = s.replaceAll("\"", "&quot;");
  s = s.replaceAll("'", "&apos;");
  return s;
}
%>
<html>
  <head>
    <script src="js/page-title.js" type="text/javascript"></script>
    <title>SEARCH RESULTS</title>
  </head>
  <body onload="showPageTitle()">
    <h1 style="display: none">SEARCH RESULTS</h1>
<%
        boolean error = false;                  //used to control flow for error messages
        String pagePath = request.getServletPath();
        pagePath = pagePath.substring(0,pagePath.lastIndexOf("/"));
        String indexName = request.getRealPath(pagePath) + "/index";        //local copy of the configuration variable
        IndexSearcher searcher = null;          //the searcher used to open/search the index
        Query query = null;                     //the Query created by the QueryParser
        Hits hits = null;                       //the search results
        int startindex = 0;                     //the first index displayed on this page
        int maxpage    = 500;                    //the maximum items displayed on this page
        String queryString = null;              //the query entered in the previous page
        String startVal    = null;              //string version of startindex
        int maxresults  = 500;              //string version of maxpage
        int thispage = 0;                       //used for the for/next either maxpage or
                                                //hits.length() - startindex - whichever is
                                                //less

        try {
          searcher = new IndexSearcher(indexName);      //create an indexSearcher for our page
                                                        //NOTE: this operation is slow for large
                                                        //indices (much slower than the search itself)
                                                        //so you might want to keep an IndexSearcher 
                                                        //open
                                                        
        } catch (Exception e) {                         //any error that happens is probably due
                                                        //to a permission problem or non-existant
                                                        //or otherwise corrupt index
%>
                <p>ERROR opening the Index - contact sysadmin!</p>
                <p>Error message: <%=escapeHTML(e.getMessage())%></p>   
<%                error = true;                                  //don't do anything up to the footer
        }
%>
<%
       if (error == false) {                                           //did we open the index?
                queryString = request.getParameter("query");           //get the search criteria
                startVal    = request.getParameter("startat");         //get the start index
                try {
                        maxpage    = maxresults;    //parse the max results first
                        startindex = Integer.parseInt(startVal);      //then the start index  
                } catch (Exception e) { } //we don't care if something happens we'll just start at 0
                                          //or end at 50

                

                if (queryString == null)
                        throw new ServletException("no query "+       //if you don't have a query then
                                                   "specified");      //you probably played on the 
                                                                      //query string so you get the 
                                                                      //treatment

                Analyzer analyzer = new StandardAnalyzer();           //construct our usual analyzer
                try {
                        QueryParser qp = new QueryParser("contents", analyzer);
                        query = qp.parse(queryString); //parse the 
                } catch (ParseException e) {                          //query and construct the Query
                                                                      //object
                                                                      //if it's just "operator error"
                                                                      //send them a nice error HTML
                                                                      
%>
                        <p>Error while parsing query: <%=escapeHTML(e.getMessage())%></p>
<%
                        error = true;                                 //don't bother with the rest of
                                                                      //the page
                }
        }
%>
<%
        if (error == false && searcher != null) {                     // if we've had no errors
                                                                      // searcher != null was to handle
                                                                      // a weird compilation bug 
                thispage = maxpage;                                   // default last element to maxpage
                hits = searcher.search(query);                        // run the query 
                if (hits.length() == 0) {                             // if we got no results tell the user
%>
                <p> No results. </p>
<%
                error = true;                                        // don't bother with the rest of the
                                                                     // page
                }
        }

        if (error == false && searcher != null) {                   
%>
                <table>
<%
                if ((startindex + maxpage) > hits.length()) {
                        thispage = hits.length() - startindex;      // set the max index to maxpage or last
                }                                                   // actual search result whichever is less

                for (int i = startindex; i < (thispage + startindex); i++) {  // for each element
%>
                <tr>
<%
                        Document doc = hits.doc(i);                    //get the next document 
                        String doctitle = doc.get("title");            //get its title
                        String url = doc.get("relPath");                  //get its path field
                        if (url != null && url.startsWith("../webapps/")) { // strip off ../webapps prefix if present
                                url = url.substring(10);
                        }
                        if ((doctitle == null) || doctitle.equals("")) //use the path if it has no title
                                doctitle = url;
                                                                       //then output!
%>
                        <td><a href="<%=url%>"><%=doctitle%></a></td>
                        <td><%=doc.get("summary")%></td>
                </tr>
<%
                }
%>
                </table>

<%       }                                            //then include our footer.
         if (searcher != null)
                searcher.close();
%>
  </body>
</html>
