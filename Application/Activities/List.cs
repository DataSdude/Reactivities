using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

using HelixToolkit.SharpDX.Core;
using HelixToolkit.SharpDX.Core.Assimp;
using SharpDX;
using HelixToolkit.SharpDX.Core.Model.Scene;
/*using Aspose.CAD.ImageOptions;
using Aspose.CAD;
using Aspose.CAD.FileFormats.Cad;
using Aspose.CAD.FileFormats.Cad.CadObjects;
*/
using System;
using System.IO;
using System.Text;
using System.Collections.Generic;
/*using Aspose.ThreeD;
using Aspose.ThreeD.Formats;
using FileFormat = Aspose.ThreeD.FileFormat;
*/
using System.Reflection.Metadata;


using Spire.Pdf;
using Spire.Pdf.Utilities;
using Aspose.ThreeD.Utilities;
using Vector3 = SharpDX.Vector3;
using Spire.Pdf.Texts;
using Application.Core;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Result<List<Activity>>> { }
  
        public class Handler : IRequestHandler<Query, Result<List<Activity>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
            {
                //CalculateMeshVolume();
                return Result<List<Activity>>.Success(await _context.Activities.ToListAsync());
            }
            
            //public double CalculateVolume(MeshGeometry3D mesh)
            //{
            //    double volume = 0;
            //    for (int i = 0; i < mesh.Indices.Count; i += 3)
            //    {
            //        Vector3 v1 = mesh.Positions[mesh.Indices[i]];
            //        Vector3 v2 = mesh.Positions[mesh.Indices[i + 1]];
            //        Vector3 v3 = mesh.Positions[mesh.Indices[i + 2]];

            //        volume += Vector3.Dot(v1, Vector3.Cross(v2, v3)) / 6.0;
            //    }

            //    return Math.Abs(volume);
            //}

            //public void CalculateMeshVolume()
            //{
            //    /*
            //     * This for reading 3d objects from a pdf using aspire.threeD
            //    // The path to the documents directory.
            //    byte[] password = null;
            //    // Extract 3D contents
            //    List<Scene> scenes = FileFormat.PDF.ExtractScene("D:/Learning/DotNet + React App/Reactivities/Application/Activities/House_Design.pdf", password);
            //    Console.WriteLine(scenes);
            //    int i = 1;
            //    // Iterate through the contents and in separate 3D files
            //    foreach (Scene scenee in scenes)
            //    {
            //        string fileName = "3d-" + (i++) + ".fbx";
            //        try
            //        {
            //            scenee.Save(fileName, FileFormat.FBX7400ASCII);
            //        }
            //        catch(Exception e)
            //        {
            //            Console.WriteLine(e);
            //        }
                    
            //    }
            //    */


            //    // Create a PdfDocument object
            //    PdfDocument doc = new PdfDocument();

            //    //Load the sample PDF file
            //    doc.LoadFromFile(@"D:\Learning\DotNet + React App\Reactivities\Application\Activities\House-Floor-Plans.pdf");

            //    PdfPageBase pdfPageBase = doc.Pages[0];

            //    PdfTextFinder finder = new PdfTextFinder(pdfPageBase);
            //    finder.Options.Strategy = PdfTextStrategy.Table;
            //    //Create a StringBuilder object
            //    StringBuilder builder = new StringBuilder();

            //    //Initialize an instance of PdfTableExtractor class
            //    PdfTableExtractor extractor = new PdfTableExtractor(doc);

            //    //Declare a PdfTable array 
            //    PdfTable[] tableList = null;

            //    //Loop through the pages 
            //    for (int pageIndex = 0; pageIndex < doc.Pages.Count; pageIndex++)
            //    {
            //        //Extract tables from a specific page
            //        tableList = extractor.ExtractTable(pageIndex);

            //        //Determine if the table list is null
            //        if (tableList != null && tableList.Length > 0)
            //        {
            //            //Loop through the table in the list
            //            foreach (PdfTable table in tableList)
            //            {
            //                //Get row number and column number of a certain table
            //                int row = table.GetRowCount();
            //                int column = table.GetColumnCount();

            //                //Loop though the row and colunm 
            //                for (int i = 0; i < row; i++)
            //                {
            //                    for (int j = 0; j < column; j++)
            //                    {
            //                        //Get text from the specific cell
            //                        string text = table.GetText(i, j);

            //                        //Add text to the string builder
            //                        builder.Append(text + " ");
            //                    }
            //                    builder.Append("\r\n");
            //                }
            //            }
            //        }
            //    }

            //    //Write to a .text file
            //    //Write to a .txt file
            //    File.WriteAllText("Table.txt", builder.ToString());
            //    Console.WriteLine(builder.ToString());



            //    var importer = new Importer();
            //    var scene = importer.Load("D:/Learning/DotNet + React App/Reactivities/Application/Activities/untitled.glb");

            //    foreach (var node in scene.Root.Traverse())
            //    {
            //        if (node is MeshNode meshNode)
            //        {
            //            double volume = CalculateVolume(meshNode.Geometry as MeshGeometry3D);
            //            Console.WriteLine($"Volume of {meshNode.Name}: {volume}");
            //        }
            //    }
            //}


        }
    }
}
