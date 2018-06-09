using System;
using Prism.Navigation;
using Xamarin.Forms;

namespace <%= nameSpace %>
{
    public class <%= name %>ViewModel : BaseViewModel
    {
        public <%= name %>ViewModel(INavigationService navigationService) : base(navigationService)
        {
        }
    }
}