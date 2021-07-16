using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Ex2.Models;

namespace Ex2.Controllers
{
    public class TotalsController : ApiController
    {
        // GET api/<controller>
        public List<Series> Get(int userId, string email) //Get series of user (according to his preferences)
        {
            Total total = new Total();
            return total.GetSeries(userId, email);
        }


        /*  * Recommended series for the user according to our algorithm according to our calculation
            * The algorithm selects "similar users" and recommends the user to see the most common series they liked.
            * Similar users = users in the same age range (5 years up and down) and members with the same gender. 
            * input - userId
            * Output - a sorted list of the most viewed series on the site */
        public List<Series> Get(int userId)// List<Series>
        {
            Total total = new Total();
            return total.RecommendForTheUser(userId);

        }
     
        public List<Episode> Get(string seriesName, int userId)
        {
            Episode e = new Episode();
            List<Episode> Elist = e.Get(seriesName, userId);
            return Elist;
        }

        /*  * Insert to the preferences DB tbl
             * the user's Preferences Episodes and the Series it belongs 
             * and the user that choose them */
         

        public HttpResponseMessage Post([FromBody]Total obj)
        {
            int feedback= obj.Insert();
            if (feedback == 1)
            {
                return Request.CreateResponse(HttpStatusCode.OK, "Preferences Inserted");
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, " Preferences already exists");
            }

            
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody] string value)
        {
        }
        
        public void Delete(int episodeId, int seriesId, int userId)
        {
            Total total = new Total();
            total.DeletePreferences(episodeId, seriesId, userId);
        }
        
    }
}