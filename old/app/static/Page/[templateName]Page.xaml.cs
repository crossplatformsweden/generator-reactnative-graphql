using System;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace <%= nameSpace %>
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class <%= name %>
    {
        public <%= name %>()
        {
            InitializeComponent();
        }
    }
}